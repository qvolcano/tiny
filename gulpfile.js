import gulp from "gulp";
import create_index from "gulp-ts-index";
import clean from "gulp-clean";
import rollupStream from '@rollup/stream';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import source from 'vinyl-source-stream';
import { dts } from 'rollup-plugin-dts';
import fs from "fs"
import { exec } from 'child_process';
import path from "path"

gulp.task("package",(resolve)=>{
  //读取index.d.ts，遍历将里面的目录导出追加到package.json
  let package_json = JSON.parse(fs.readFileSync("package.json"));
  let index = fs.readFileSync("dist/index.d.ts");
  package_json.exports = {}
  package_json.typesVersions = {"*":{}}
  let matchs = index.toString().matchAll(new RegExp("export.*?from.*?\"(.*?)\"","g"));
  let dirs = [];
  for(let i of matchs){
    dirs.push(i[1]);
  }
  for(let i of dirs){
    let name = path.basename(i)
    package_json.exports["./"+name] = {
      "require":"./"+path.join("./dist", name+"/index.cjs.js").replace("\\","/"),
      "import":"./"+path.join("./dist", name+"/index.js").replace("\\","/")
    },
    package_json.typesVersions["*"][name] = [path.join("dist",name,"index.d.ts")]
  }
  package_json.exports["."] = {
    "require":"./"+path.join("./dist", "index.cjs.js").replace("\\","/"),
    "import":"./"+path.join("./dist", "index.js").replace("\\","/")
  },
  package_json.typesVersions["*"]["."] = [path.join("dist","index.d.ts").replace("\\","/")]
  fs.writeFileSync("package.json", JSON.stringify(package_json, null, 2));
  resolve(); 
})

gulp.task('rollup', (cb) => {
  exec('rollup -c', (err, stdout, stderr) => {
    console.log(stdout); // 打印正常的输出
    console.error(stderr); // 打印错误输出
    cb(err); // 完成任务
  });
});
gulp.task("clean", function () {
    return gulp.src("dist", { allowEmpty: true }).pipe(clean({ allowEmpty: true }))
})

gulp.task("index", function () {
    return gulp.src("src/**").pipe(create_index(null, false)).pipe(gulp.dest("src"))
})

gulp.task("copy", function () {
    return gulp.src("src/**").pipe(gulp.dest("dist"))
})

gulp.task("default", gulp.series(["clean", "index", "rollup","package"]));


type JobResult = {

} | ((result: any) => void)

export class Job {
    then(result: JobResult) {

    }

    resolve() {

    }

    reject() {

    }
}
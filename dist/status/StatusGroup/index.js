class StatusGroup {
    constructor(context) {
        this.context = context;
        this.name = "";
        this.statusMap = {};
    }
    register(status) {
        this.statusMap[status.name] = status;
    }
    setStatus(key) {
        let status = this.statusMap[key];
        if (this.currentStatus) {
            this.currentStatus.close();
        }
        this.currentStatus = status;
        if (status) {
            status.open();
        }
    }
}

export { StatusGroup };

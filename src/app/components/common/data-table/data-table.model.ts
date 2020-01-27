export class DataTableModel {
    columns= [];
    columnDefs= [];
    dataSource= [];
    showAction = true;
    buttonList = [];
    iconList = [];
    constructor(obj=null){
        if(obj){
            this.columns = obj.columns || [];
            this.columnDefs = obj.columnDefs || [];
            this.dataSource = obj.dataSource || [];
            this.iconList = obj.iconList || [];
            this.buttonList = obj.buttonList || [];
            if(this.showAction)
                this.columns = [...this.columns, 'action'];
        }
    }
}
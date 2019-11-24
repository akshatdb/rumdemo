export class DataTableModel {
    columns= [];
    columnDefs= [];
    dataSource= [];
    constructor(obj=null){
        if(obj){
            this.columns = obj.columns;
            this.columnDefs = obj.columnDefs;
            this.dataSource = obj.dataSource;
        }
    }
}
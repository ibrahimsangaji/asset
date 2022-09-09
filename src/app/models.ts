export class Base{
    Id:number=0;
    RowStatus:number=0;
    CreateDate:string="";
    CreateBy: string = "";
    UpdateDate: string = "";
    UpdateBy: string = "";
}
export class Asset {
    Id: number = 0;
    RowStatus: number = 0;
    AssetNumber: string = "";
    AssetNumberSAP: string = "";
    Name: string = "";
    TypeCode: string = "";
    BrandCode: string = "";
    RackCode: string = "";
    Spec: string = "";
    Status: number = 0;
    Enable: number = 0;
    CreateDate: string = "";
    CreateBy: string = "";
    UpdateDate: string = "";
    UpdateBy: string = "";
    Software=[]
}

export class AssetIn {
    Id: number = 0;
    RowStatus: number = 0;
    GRNo: string = "";
    ReffNo: string = "";
    AssetName: string = "";
    TypeCode: string = "";
    BrandCode: string = "";
    Unit: number = 0;
    NoPO: string = "";
    NoPR: string = "";
    AssetNumberSAP: string = "";
    PurchasePrice: number;
    ReceiveDate: any;
    TransactionType: number = 0;
    RackCode: string = "";
    Notes: string = "";
    Spec:string ="";
    Status: number = 0;
    Enable: number = 1;
    ApproveDate: string = "";
    ApproveBy: string = "";
    CreateDate: string = "";
    CreateBy: string = "";
    UpdateDate: string = "";
    UpdateBy: string = "";
    Detail = [];
    ReturnPartial: number = 0;
}

export class User {
    Username: string = "";
    Password: string = "";
}

export class AssetOut {
    Id: number = 0;
    RowStatus: number = 0;
    GINo: string = "";
    Unit: number = 0;
    AssetNumberSAP: string = "";
    ReceiverFunction: string = "";
    PIC: string = "";
    Enable: number = 0;
    Status = 0;
    ApproveDate: string = "";
    ApproveBy: string = "";
    CreateDate: string = "";
    CreateBy: string = "";
    UpdateDate: string = "";
    UpdateBy: string = "";
    Detail = []
}

export class StockOpname {
    Id: number = 0;
    RowStatus: number = 0;
    STOCode: string = "";
    Month: number = 0;
    Year: number = 0;
    FunctionCode: string = "";
    Status: number = 0;
    ApproveDate: string = "";
    ApproveBy: string = "";
    CreateDate: string = "";
    CreateBy: string = "";
    UpdateDate: string = "";
    UpdateBy: string = "";
    Detail = [];
}
export class StockOpnameDetail {
    Id: number = 0;
    RowStatus: number = 0;
    AssetNumber:string="";
    AssetNumberSAP:string="";
    STOCode: string = "";
    Notes:string="";
    Status:number=0;
    CreateDate: string = "";
    CreateBy: string = "";
    UpdateDate: string = "";
    UpdateBy: string = "";
}

export class Employee{
    UserId: string;
    EmployeeNumber: string;
    Name: string;
    FunctionCode:string;
    FunctionName: string;
    Email: string;
    PhoneNumber: string;
    DriverLicenseNumber: string;
    IsActive: boolean = true;
    IsSelfService: boolean = true;
    IsAdmin: boolean = true;
}
//asset status
//case 1: retVal = "Free";
//case 2: retVal = "Book";
//case 3: retVal = "Outgoing";
//case 4: retVal = "Damage";
//case 5: retVal = "Repair";
//case 6: retVal = "Lost";

//asset out
//case 1: retVal = "New";
//case 2: retVal = "Approved";
//case 3: retVal = "Reject";
//case 4: retVal = "Return";
//case 5: retVal = "Return partial";
class ApiError extends Error{
    
    status: number;

    constructor(status:number,name:string,message:string) {
        super();
        this.status=status;
        this.name = name;
        this.message=message;
    }

    static badRequest(name:string,message:string){
        return new ApiError(404,name,message)
    }

    static internal(name:string,message:string){
        return new ApiError(500,name,message)
    }

    static forbidden(name:string,message:string){
        return new ApiError(403,name,message)
    }

    static noUploadFile(name:string,message:string){
        return new ApiError(400,name,message)
    }
}

export default ApiError
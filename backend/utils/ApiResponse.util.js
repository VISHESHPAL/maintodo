class ApiResponse {
    constructor(statusCode ,success ,  message , data , meta ){
        this.statusCode =  statusCode 
        this.success = success
        this.message = message 
        this.data = data 
        this.meta = meta
    }


    send(res){
        let responseObject = {
            message : this.message,
            success : this.success
        }

        if(this.data) responseObject.data = this.data
        if(this.meta) responseObject.meta = this.meta

        res.status(this.statusCode).json(responseObject)
    }
}


export default ApiResponse
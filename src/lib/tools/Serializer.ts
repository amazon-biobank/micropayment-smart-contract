export class Serializer{
    public static serialize(object: Object){
        return Buffer.from(JSON.stringify(object));
    }

    public static deserialize(data: string) {
        try{
            const json = JSON.parse(data);
            return json;
        }
        catch(e){
            return {}
        }
        
    }

}
import { Context } from "fabric-contract-api";
import { Serializer } from "./Serializer";

export class State{
    public static async getState(ctx: Context, state: string){
        const rawState = await ctx.stub.getState(state)
        return await Serializer.deserialize(rawState.toString());
    }

    public static async putState(ctx: Context, key: string, value: Object){
        const serializedValue = Serializer.serialize(value);
        ctx.stub.putState(key, serializedValue);
    }
}
// server/trpc/router/user.ts
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import mongoose from "mongoose";
import { MongoClient, ReturnDocument } from "mongodb";
import { ITrigger, TRIGGER_COLLECTION } from "@/database/types";

const conn = mongoose.connection;

export const workflowRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  create: publicProcedure
    .input(
      z.object({
        type: z.enum(["transfer", "twitter", "swap"]), // BlockType enum validation
        network: z.enum(["ethereum", "arbitrum", "polygon"]), // NetworkType enum validation
        contractAddress: z.string().min(1),
        transferData: z
          .object({
            token: z.string().min(1),
          })
          .optional(),
        swapData: z
          .object({
            target: z.string().min(1), // address
            tokenIn: z.string().min(1), // address
            tokenOut: z.string().min(1), // address
            swapper: z.enum(["1inch", "uniswap"]), // Swapper enum validation
          })
          .optional(),
        twitterCallData: z
          .object({
            twitterHandle: z.string().min(1),
            searshWords: z.string().min(1), // Fix typo: 'searshWords' -> 'searchWords'
          })
          .optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const client = new MongoClient(process.env.MONGODB_URI!);
      await client.connect();

      const dbName = "mongo";
      const collectionName = "triggers";

      const database = client.db(dbName);
      const collection = database.collection<ITrigger>(collectionName);

      const toInsert: ITrigger = {
        type: input.type,
        network: input.network,
        contractAddress: input.contractAddress,
        status: "new",
        transferData: input.transferData ?? undefined,
        swapData: input.swapData ?? undefined,
        twitterCallData: input.twitterCallData ?? undefined,
      };

      await collection.insertOne(toInsert);
      return toInsert;
    }),
});

import { asNexusMethod } from "nexus";
import { GraphQLDateTime } from "graphql-scalars"; // 1

export const GQLDate = asNexusMethod(GraphQLDateTime, "dateTime");  // 2

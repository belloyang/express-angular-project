import { HarvesterOperation } from "./harvester-operation";

export interface OpResponseType {
    operation: HarvesterOperation.get_op_responses;
    responses: string[];
}

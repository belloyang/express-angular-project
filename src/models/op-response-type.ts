import { HarvesterOperation } from '@nanometrics/pegasus-harvest-lib';

export interface OpResponseType {
    operation: HarvesterOperation.get_op_responses;
    responses: string[];
}

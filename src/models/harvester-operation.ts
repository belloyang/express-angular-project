export enum HarvesterOperation {
    // async operations
    harvest_data = 'harvest-data',
    harvest_logs = 'harvest-logs',
    harvest_soh = 'harvest-soh',
    harvest_timing_soh = 'harvest-timing-soh',
    list = 'list-devices',
    get_digitizer_info = 'get-digitizer-info',
    load_digitizer_configs = 'load-digitizer-configs',
    load_harvesting_history = 'load-harvesting-history',
    get_volume_info = 'get-volume-info',
    read_volume = 'read-volume',
    // sync operations
    get_op_responses = 'get-op-responses',
    stop_operation = 'stop-operation',
}

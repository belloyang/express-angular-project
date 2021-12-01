export enum UpperLimit {
  timestamp = Number.MAX_SAFE_INTEGER, /* 
      1) the max value (in microseconds) supported in the library to avoid overflow in nanoseconds precision:
         (2 ^ 63 - 1)ns =  ((2 ^ 63 - 1) / 1000)us = (9223372036854775807 / 1000)us = 9223372036854775us
      2) JavaScript represents integers through floatin point (double), which hash 53 bits mantissa:
         MAX_SAFE_INTEGER (signed) = (2 ^ 53 - 1)
      MAX_SAFE_INTEGER(2) < 9223372036854775(1) -> MAX_SAFE_INTEGER should be used.
      Corresponds to "06/05/2255 @ 11:47pm (UTC)" */
  sequence_number = 2 ** 32 - 2 /* max(sequence_number) = max(uint32_t) = 2^32 - 1,
    but C++ library reserves this value for PSF_INVALID_SEQUENCE_INDEX -> use 2^32 - 2
  */
}

export enum HarvestSubDirectory {
  seismicData = '',
  soh = 'soh',
  timingSoh = 'timing_soh',
  forensicLogs = 'logs'
}

export const OutputPatterns = {
  SDS: '${Y}/${N}/${S}/${C}.D/${N}.${S}.${L}.${C}.D.${Y}.${J}',
  BUD: '${N}/${S}/${S}.${N}.${L}.${C}.${Y}.${J}',
};

/**
 * See https://docs.google.com/spreadsheets/d/1s3q3Ywi3yDhK-BG_c-baTRWCgXVpr_03KemhfIAerns/edit#gid=0 for more details.
 * These values should be kept in sync.
 */
export const BinCodes = {
  land: [
    "ASM19053-131",   /* Model PGS-131: Pegasus Land V1 (3 channels), 32GB */
    "ASM19053-140",   /* Model PGS-140: Pegasus Land V1 (4 channels), 32GB */
    "ASM19053V2-131", /* Model PGS-131: Pegasus Land V2 (3 channels), 32GB */
    "ASM19053V2-140", /* Model PGS-140: Pegasus Land V2 (4 channels), 32GB */
    "ASM19458-140",   /* Model PGS-140-XC: Pegasus Polar V1, 32GB */
    "ASM19458V2-140", /* Model PGS-140-XC: Pegasus Polar V2, 32GB */
    "ASM19685-140",   /* Model PGS-140-128GB-XC: Pegasus Polar, 128GB */
  ],
  obs: [
    "ASM19361-01", /* Model PGSM-N: Pegasus OBS V1, 128GB */
    "ASM19361-02", /* Model PGSM-S: Pegasus OBS V1 (NMX-Supplied Seascan), 128GB */
    "ASM19481-01", /* Model PGSM2-N: Pegasus OBS V2 , 128GB*/
    "ASM19481-02"  /* Model PGSM2-S: Pegasus OBS V2 (NMX-Supplied Seascan), 128GB */
  ]
};

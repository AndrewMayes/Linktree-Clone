/**
 * New Relic agent configuration.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name : ['Linktree-Clone'],
  /**
   * Your New Relic license key.
   * Make sure to set NEW_RELIC_LICENSE_KEY as this env variable
   */
  license_key : process.env.NEW_RELIC_LICENSE_KEY,
  logging : {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'trace'
  }
};
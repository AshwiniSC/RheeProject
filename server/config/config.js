
exports.config = function() {

  const objConfig = {};
  const NODE_ENV = "development";
  objConfig.host = "";
  objConfig.siteUrl = "";
  
  objConfig.aws                 = {}
  objConfig.aws.accessKeyId     = ''
  objConfig.aws.secretAccessKey = ''
  objConfig.aws.key             = objConfig.aws.accessKeyId
  objConfig.aws.secret          = objConfig.aws.secretAccessKey
  objConfig.aws.region          = ''
  objConfig.aws.bucket          = ''

  objConfig.token = {};
  objConfig.token.secret = 'piQqgR98eAJJtF[92mRoAnV]U3}sUhtPd$z&vW]>h7%Us3R24ZL)Kb3)';
  objConfig.token.token_life = 48; // hours 

  return objConfig;
};

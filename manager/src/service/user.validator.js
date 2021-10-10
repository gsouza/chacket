
class UserValidator {

  static canLogin(data) {
    
    if (!data.email || !data.pass)
      throw new Error('Something wrong in parameters providden!');

    return true;
  }

  static canAddNew(data) {
    
    if (!data.email || !data.pass || !data.name)
			throw new Error('Something wrong in parameters providden!');

    return true; 
  }

  static canDelete(data) {
    
    if (!data.email)
      throw new Error('Something wrong in parameters providden!');

    return true; 
  }

  static canUpdate(data, params) {

		if (!data.email || !data.pass || !data.name || !params.id)
			throw new Error('Something wrong in parameters providden!');

		return true; 
	}

  static canGetByName(data) {
    
    if (!data.name)
      throw new Error('Something wrong in parameters providden!');

    return true; 
  }

}

module.exports = UserValidator;
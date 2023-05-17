export default function validateInfo(values) {
    let errors = {};
    // var regex = /^[a-zA-Z]*$/;
 
    //     //Validate TextBox value against the Regex.
    //     var isValid = document.getElementById("fname").value;
    //     if (!isValid.match(regex)) {
    //       errors.fname = 'lastname required';
    //     }
 
      
    if (!values.fname.trim()) {
      errors.fname = 'frstname required';
    }
    if (!values.lname.trim()) {
        errors.lname = 'lastname required';
      }
    else if (!/^[A-Za-z]+/.test(values.lname.trim())) {
      errors.lname = 'Enter a valid lname';
    }
  
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }
  
    if (!values.cpassword) {
      errors.cpassword = 'Password is required';
    } else if (values.cpassword !== values.password) {
      errors.cpassword = 'Passwords do not match';
    }
    return errors;
  }
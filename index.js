

var firebaseConfig = {
    apiKey: "AIzaSyAxN0JEihvLN0T-0X_PFUjnFJH-T34CZvg",
    authDomain: "greengadget-c7202.firebaseapp.com",
    databaseURL: "https://greengadget-c7202-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "greengadget-c7202",
    storageBucket: "greengadget-c7202.appspot.com",
    messagingSenderId: "654816383082",
    appId: "1:654816383082:web:2c83d45cd83d3191153a13",
    measurementId: "G-VSE5VNYYEX"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const database = firebase.database()
  
  function register () {
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    confirm_password = document.getElementById('confirm_password ').value
  
    if (validate_email(email) == false || validate_password(password) == false || validate_confirm_password(confirm_password) == false) {
      alert('Email or Password is Outta Line!!')
      return
    }
    if (validate_field(full_name) == false ) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }

    if (password != confirm_password) {
      alert('Passwords do not match.');
      return;
    }
   
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      var user = auth.currentUser
  
      var database_ref = database.ref()
  
      var user_data = {
        email : email,
        full_name : full_name,
        
        last_login : Date.now()
      }
  
      database_ref.child('users/' + user.uid).set(user_data)
      alert('User Created!!')

      window.location.href = "main.html";
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  function login () {
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      var user = auth.currentUser
  
      var database_ref = database.ref()
  
      var user_data = {
        last_login : Date.now()
      }
  
      database_ref.child('users/' + user.uid).update(user_data)
  
      alert('User Logged In!!')

      window.location.href = "main.html";
  
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      return true
    } else {
      return false
    }
  }
  
  function validate_password(password) {
    if (password < 6) {
      return false
    } else {
      return true
    }
  }

  function validate_confirm_password(confirm_password) {
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
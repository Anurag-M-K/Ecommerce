jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z\s]+$/i.test(value);
    }, "Only alphabetical characters");


//user login validation

$('#userLoginForm').validate({
    rules:{
        email:{
            required:true,
            email:true
        },
        password:{
            required:true,
            minlength:6,
            maxlength:19
        }
    }
})

//user signup validation

$('#userSignupForm').validate({
    rules:{
        name:{
            required:true,
            lettersonly:true,
            minlength:5,
            maxlength:19
        },
        email:{
            required:true,
            email:true
        },
        password:{
            required:true,
            minlength:6,
            maxlength:15
        },
        confirmPassword:{
            required:true,
            equalTo:'#password'
        }
    },
    messages:{
        
        confirmPassword:{
            equalTo:"Password doesn't match"
        }
    }
})


//admin login validation

// $('#adminLoginpost').validate({
//     rules:{
//         email:{
//             required:true,
//             email:true
//         },
//         password:{
//             required:true,
//             minlength:8,
//             maxlength:19
//         }
//     }
// })





// $(document).ready(function () {

//     (function ($) {
//         "use strict";


//         jQuery.validator.addMethod('answercheck', function (value, element) {
//             return this.optional(element) || /^\bcat\b$/.test(value)
//         }, "type the correct answer -_-");

//         // validate contactForm form
//         $(function () {
//             $('#contactForm').validate({

//                 rules: {
//                /*      name: {
//                         required: true,
//                         minlength: 2
//                     },
//                     subject: {
//                         required: true,
//                         minlength: 4
//                     },
//                     number: {
//                         required: true,
//                         minlength: 5
//                     }, */
//                     email: {
//                         required: true,
//                         email: true
//                     },
//                     password: {
//                         required: true,
//                         minlength: 6
//                     }
//                   /*   message: {
//                         required: true,
//                         minlength: 20
//                     } */
//                 },
//                 messages: {
//                   /*   name: {
//                         required: "come on, you have a name, don't you?",
//                         minlength: "your name must consist of at least 2 characters"
//                     },
//                     subject: {
//                         required: "come on, you have a subject, don't you?",
//                         minlength: "your subject must consist of at least 4 characters"
//                     },
//                     number: {
//                         required: "come on, you have a number, don't you?",
//                         minlength: "your Number must consist of at least 5 characters"
//                     }, */
//                     email: {
//                         required: "enter your registered email address",
//                         email:'enter a email'
//                     },
//                     password:{
//                         required: 'enter your password',
//                         minlength: 'enter atleast 6 characters'

//                     }
//                     // message: {
//                     //     required: "um...yea, you have to write something to send this form.",
//                     //     minlength: "thats all? really?"
//                     // }
//                 },
//                 submitHandler: function (form) {
//                     $(form).ajaxSubmit({
//                         type: "POST",
//                         data: $(form).serialize(),
//                         url: "/login",
//                         success: function () {
//                             $('#contactForm :input').attr('disabled', 'disabled');
//                             $('#contactForm').fadeTo("slow", 1, function () {
//                                 $(this).find(':input').attr('disabled', 'disabled');
//                                 $(this).find('label').css('cursor', 'default');
//                                 $('#success').fadeIn()
//                                 $('.modal').modal('hide');
//                                 $('#success').modal('show');
//                             })
//                         },
//                         error: function () {
//                             $('#contactForm').fadeTo("slow", 1, function () {
//                                 $('#error').fadeIn()
//                                 $('.modal').modal('hide');
//                                 $('#error').modal('show');
//                             })
//                         }
//                     })
//                 }
//             })
//         })

//     })(jQuery)
// })
import { object, string , number, date} from 'yup';


let userSchema = object({
 name: string('fill name please').required(),
 age: number().required().positive('อายุเป็นเลขบวกดิ').integer(),
 email: string().email(),
 website: string().url().nullable(),
 createdOn: date().default(() => new Date()),
});

let data = {
 name : '',
 age: -20,
 email : 'n@true'
}

userSchema.validate(data, {abortEarly : false}).then(rs =>{
  console.log(rs);
  
}).catch(error=>{
  console.log('**** Error ****');
  console.log(error.name);
  console.log(error.message);
  console.log(error.path);
  console.log(error.inner[1]);
})

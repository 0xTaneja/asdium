import { Account } from "../components/CreateAccount";
import { Quote } from "../components/Quote";

export function Signup()
{
  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
         <div>
          <Account type="signup"/>
         </div>
         <div className="hidden lg:block">
         <Quote/>
         </div>
        
        </div>
       
    </div>
  )
}
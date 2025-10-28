import {Schema,model} from "mongoose";

const DropdownItems=new Schema({
    title:{type:String,required:true,trim:true},
    href:{type:String,required:true,trim:true},
})

const NavbarItemSchema = new Schema({
    title: { type: String, required: true,trim:true },
    href: { type: String, required: true,trim:true },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    dropdownItems:  {type:[DropdownItems]},
});

export default model('NavbarItem', NavbarItemSchema);

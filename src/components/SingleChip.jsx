import React, {useState} from 'react'
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const SingleChip = ({ctg,selectedCategories,setSelectedCategories}) => {

    const [selected, setSelected] = useState(false)
    const handleClick =()=>{
        if(selectedCategories.indexOf(ctg) === -1){
            setSelected(true)
            setSelectedCategories((prev)=>[...prev,ctg])
        }else{
            setSelected(false)
            setSelectedCategories(selectedCategories.filter(item=>item !==ctg))
        }
    }

  return (
    <Chip 
        label={ctg}
        clickable
        color='secondary'
        onClick={()=>handleClick()}
        icon={selected? <DoneIcon /> : <RadioButtonUncheckedIcon />}
    />
  )
}
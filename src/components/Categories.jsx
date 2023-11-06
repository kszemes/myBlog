import React, {useContext} from 'react'
import Stack from '@mui/material/Stack';
import {SingleChip} from './SingleChip';
import {CategContext} from "../context/CategProvider.jsx";
import Typography from "@mui/material/Typography";

export const Categories = ({selectedCategories, setSelectedCategories}) => {
    const {categories} = useContext(CategContext)
    console.log('Categories renderelődik');
    return (
        <Stack direction='row' spacing={1}
               sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '5px', gap: '10px'}}>
            <Typography sx={{width: '100%', textAlign: 'center'}}>Categories</Typography>
            {categories && categories.map(ctg =>
                <SingleChip key={ctg} ctg={ctg}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                />
            )}
        </Stack>
    )
};
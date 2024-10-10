import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenueItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


const UIPlayground = () => {
    const [color, setColor] = useState('Green')
    return (
        <div>
            <Button color="secondary" variant="contained">Sample</Button>
            <Select value={color} onChange={(e) => setColor(e.target.value)}>
                <MenueItem value="Red">Red</MenueItem>
                <MenueItem value="Blue">Blue</MenueItem>
                <MenueItem value="Green">Green</MenueItem>
            </Select>
        </div>
    )
}

export default UIPlayground;
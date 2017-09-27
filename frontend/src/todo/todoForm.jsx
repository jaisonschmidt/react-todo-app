import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {

    const keyHandler = (e) => {
        if(e.key == "Enter"){
            e.shiftKey ? props.handleSearch() : props.handleAdd()
        } else if(e.key == "Escape"){
            props.handleClear()
        }
    }

    return (
        <div className="row todoForm">
    
            <Grid cols="12 9 10">
                <input 
                    type="text" 
                    className="form-control" 
                    id="description" 
                    value={props.description}
                    onChange={props.handleChange}
                    onKeyUp={keyHandler}
                ></input>
            </Grid>
    
            <Grid cols="12 3 2">
                <IconButton style="primary" icon="plus" onClick={props.handleAdd}></IconButton>
                <IconButton style="info" icon="search" onClick={props.handleSearch} />
            </Grid>
            
        </div>
    )
}
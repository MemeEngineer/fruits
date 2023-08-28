const React = require('react')

function Show(props){
    const {veg} = props
    return(
        <main>
            <h1>Show Page</h1>
            The {veg.name} is {veg.color}, 
            {veg.readyToEat ? ' It is ready to eat' : " It is not ready to eat... Cant touch this"}
        </main>
    )
}


module.exports = Show;
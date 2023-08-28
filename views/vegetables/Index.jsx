const React = require('react')

function Index(props){
    const {vegs} = props
    
    return(
        <main>
            <nav>
    <a href="/vegs/new">Create a New Vegetable</a>
</nav>
            <h1> Index Page</h1>
            <ul>
                {vegs.map((veg,i) => {
                    return(
                        <li key={i}>
                            The
                            <a href={`/vegs/${i}`}> {veg.name}</a> {''}
                            is {veg.color} <br/> {veg.readyToEat ? ' It is ready to eat' : " It is not ready to eat"}
                            <br/>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}

module.exports = Index;
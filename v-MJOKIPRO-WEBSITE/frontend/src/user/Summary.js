import React from "react"
import Matthew from './Matthew-Joki.jpg'

const Summary = () => {

    return (
        <div style={{borderRadius: '6px', border: '4px solid rgba(30, 98, 108, 0.729)'}} className="container">
            <div style={{borderBottom: '4px solid rgba(30, 98, 108, 0.729)', borderRadius: '4px', padding: '15px', backgroundImage: 'linear-gradient(to  left, rgba(47, 45, 53, 0.777), rgba(22, 22, 36, 0.908))'}} className="container text-white   mt-3">
                <img style={{float: 'right'}} src={Matthew} height="200" width="200" alt="" />
                    Been to Lowe's or Walmart lately? I'm the guy who assembles everything you see outside the front of the store (inside too), and my boss sends me to cover stores from Auburn, AL to Troy, AL because he knows that I resolve any problems and find solutions to all issues that I encounter no matter how large (which spares a lot of agony).  It's hard work, it's dirty, it's hot, and there is driving involved because income is based on current store needs and available work, but I'm blessed to have this job, and I always strive to go above and beyond what is required of me.
            </div>
            <p style={{borderBottom: '4px solid rgba(30, 98, 108, 0.729)', borderRadius: '4px', padding: '15px', backgroundImage: 'linear-gradient(to  left, rgba(47, 45, 53, 0.777), rgba(22, 22, 36, 0.908))'}} className="container text-white   mt-3">Needless to say, I live to make provision for my family, as well as to serve my co-workers and neighbors, and because I use every resource available to gain the knowledge needed to solve the problems that most people don't want to deal with, they trust that they can count on me to come through every time.  I'm blessed in that I have a phenomenal support network in my personal life, and I incorporate that positive energy into my work ethic.  Trust, dependability, and hard work are the redeeming qualities that create the relationships that companies are founded on, and those attributes define how I strive to live my daily life.</p>
            <p style={{borderBottom: '4px solid rgba(30, 98, 108, 0.729)', borderRadius: '4px', padding: '15px', backgroundImage: 'linear-gradient(to  left, rgba(47, 45, 53, 0.777), rgba(22, 22, 36, 0.908))'}} className="container text-white   mt-3">Growing up, I developed an affection for music, and as a result I learned how to play the synthesizer, which at its core uses different interconnected components as building blocks for sound design, and I also learned how to develop multi-track programs using MIDI and sequencers.  As I got older, the programs got larger, and I filled my desire to perfect my hunger for systems design at Trenholm State Technical College, where I graduated Magna cum laude, and was awarded an Associate's Degree in Applied Computer Science.</p>
            <p style={{borderBottom: '4px solid rgba(30, 98, 108, 0.729)', borderRadius: '4px', padding: '15px', backgroundImage: 'linear-gradient(to  left, rgba(47, 45, 53, 0.777), rgba(22, 22, 36, 0.908))'}} className="container text-white   mt-3">Currently, I am using the polished skills that I have recently obtained from completing the Software Engineering curriculum at Auburn University!</p>
            <p style={{borderBottom: '4px solid rgba(30, 98, 108, 0.729)', borderRadius: '4px', padding: '15px', backgroundImage: 'linear-gradient(to  left, rgba(47, 45, 53, 0.777), rgba(22, 22, 36, 0.908))'}} className="container text-white   mt-3">Please feel free to reach out, and be sure to check out my projects on my LinkedIn profile.</p>
        </div>
    )
}

export default Summary
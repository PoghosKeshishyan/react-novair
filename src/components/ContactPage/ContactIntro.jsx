

export function ContactIntro({contactInrto}){

    
    return(
        <div className="contact_intro" style={{backgroundImage:`url(${contactInrto.img_url})`}}>
        <h2 className="heading">{contactInrto.title}</h2>
        </div>
    )
}
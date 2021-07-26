import React from 'react';

interface ovPropsInterface{
  title:string,
  icon:any,
  counts:number|string
}


const OverviewCard:React.FC<ovPropsInterface> = props =>{
  const {
    title,
    icon:Icon,
    counts
  } = props;

  return(
    <div className="dashboard-overview-card">
      <h1 className="text-18px-white mb-2">
        {title}
      </h1>
      <p className='text-26px-white '>{counts}</p>
      <Icon className="icon"/>
    </div>
  );
}

export default OverviewCard;
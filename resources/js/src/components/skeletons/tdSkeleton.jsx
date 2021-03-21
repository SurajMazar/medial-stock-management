import react from 'react';
import {Skeleton} from 'antd'

const TdSkeleton = props =>{
  const {
    cols,
    rows
  } = props;

  return(
    <tbody>
      {
        Array.from(Array(rows),(e,i)=>(
        <tr key={i}>
          {
            Array.from(Array(cols),(e,i)=>(
              <td key={i}>
                <Skeleton active paragraph={false} /> 
              </td>
            ))
          }
        </tr>
        ))
      }
    </tbody>
  );
}

export default TdSkeleton;
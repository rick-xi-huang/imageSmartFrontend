import React from 'react'


const Description = ({analysis}) => {

    let table;

    const generateTable = (type, rows) => {
        let table =
            <div className="pa4 bg-transparent">
                <div className="overflow-auto">
                    <table className="f6 w-100 mw8 center" cellSpacing="0">
                        <thead>
                        {  (type === "face" ) &&
                            <tr>
                            <th className="fw6 pa3">Face</th>
                            <th className="fw6 pa3">Joy</th>
                            <th className="fw6 pa3">Anger</th>
                            <th className="fw6 pa3">Surprise</th>
                            <th className="fw6 pa3">Sorrow</th>
                            </tr>
                        }
                        {  (type === "object" ) &&
                        <tr>
                            <th className="fw6 pa3">ID</th>
                            <th className="fw6 pa3">Object</th>
                            <th className="fw6 pa3">Confidence</th>
                        </tr>
                        }
                        {  (type === "landmark" ) &&
                        <tr>
                            <th className="fw6 pa3">ID</th>
                            <th className="fw6 pa3">Landmark</th>
                            <th className="fw6 pa3">Confidence</th>
                        </tr>
                        }
                        </thead>
                        <tbody className="lh-copy">
                        {rows}
                        </tbody>
                    </table>
                </div>
            </div>;
        return table;
    };

    if (analysis) {

        let rows = [];

        if(analysis.length === 0){
          table = <p> Nothing Detected </p>
        }else if(analysis[0].name){
           rows = analysis.map((object, i) =>
               <tr key={i}>
                   <td className="pa3">{i + 1}</td>
                   <td className="pa3">{object.name}</td>
                   <td className="pa3">{object.score.toFixed(2)}</td>
               </tr>
           );
           table = generateTable("object", rows);
        }else if(analysis[0].joyLikelihood){
            rows = analysis.map((object, i) =>
                <tr key={i}>
                    <td className="pa3">{i + 1}</td>
                    <td className="pa3 f7">{object.joyLikelihood}</td>
                    <td className="pa3 f7">{object.angerLikelihood}</td>
                    <td className="pa3 f7">{object.sorrowLikelihood}</td>
                    <td className="pa3 f7">{object.surpriseLikelihood}</td>
                </tr>
            );
            table = generateTable("face", rows);
        }else if(analysis[0].description){
            rows = analysis.map((object, i) =>
                <tr key={i}>
                    <td className="pa3">{i + 1}</td>
                    <td className="pa3">{object.description}</td>
                    <td className="pa3">{object.score.toFixed(2)}</td>
                </tr>
            );
            table = generateTable("landmark", rows);
        }

        return <article className="center mw5 mw6-ns hidden ba mv4">
            <h1 className="f4 bg-near-black white mv0 pv2 ph3">From your AI friend</h1>
            <div className="pa3 bt">
                <div className="f6 f5-ns lh-copy measure mv0">
                    {table}
                </div>
            </div>
        </article>;
    }else{
        return null;
    }
};

export default Description;
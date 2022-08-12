import React, { CSSProperties } from 'react';
import { useCSVReader } from 'react-papaparse';
import styless from './Conversor.module.scss';

const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: '20%',
  } as CSSProperties,
  acceptedFile: {
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '80%',
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: '0 20px',
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: 'red',
  } as CSSProperties,
};

export default function Conversor() {
  const { CSVReader } = useCSVReader();
  // an array that will receive the data from the CSV file
  const [data, setData] = React.useState([]);
  // a function that will check if there are duplicate names inside the first row of array data, if there console.log the name, using the '--downlevelIteration' flag
  const checkDuplicateNames = () => {
    const names = data.map((item) => item[0]);
    const values = data.map((item) => item[1]);
    const duplicates = names.filter((v, i, a) => a.indexOf(v) !== i);
    const duplicatesTwo = values.filter((v, i, a) => a.indexOf(v) !== i);
    // duplicates.forEach((name) => console.log(name));
    // duplicatesTwo.forEach((value) => console.log(value));
    // if both checks are true, console log 'duplicate' and the name, if not do nothing
    if (duplicates.length > 0 && duplicatesTwo.length > 0) {
      duplicates.forEach((name) => console.log(name));
    } else {
      console.log('no duplicate');
    }
  };
  checkDuplicateNames();

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        // console.log('---------------------------');
        // console.log(results);

        // console.log('---------------------------');
        // console every item inside the array
        // results.data.forEach((item: any) => {
        //   console.log(item);
        // });
        console.log('Carregado');
        // for each item inside results.data, we will add the item to the data array data
        setData(results.data);
        // console log each item inside the data array
        data.forEach((item: any) => {
          console.log(item);
        });
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div style={styles.csvReader}>
            <button type='button' {...getRootProps()} style={styles.browseFile}>
              Browse file
            </button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} style={styles.remove}>
              Remove
            </button>
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
          <table>
            <thead>
              <tr>
                <th id={styless.nome}>Nome</th>
                <th>Entrada</th>
                <th>Saida</th>
                <th>Total</th>
                <th>Erro?</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                  <td>{item[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </CSVReader>
  );
}

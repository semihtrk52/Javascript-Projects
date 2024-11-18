import React, { useState, useEffect } from 'react';
import '../css/currency.css';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import axios from 'axios';

let BASE_URL = 'https://api.freecurrencyapi.com/v1/latest';
let API_KEY = 'fca_live_LxV3jvgCCBzHr5xVouTX3Im9mGyMYiXA8nvTf6PC';

function Currency() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('AUD');
  const [result, setResult] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error('API hatası:', error);
      }
    };

    const Data = {

    }

    fetchData();
  }, [fromCurrency]);

  const exchange = () => {
    const rate = data[toCurrency];
    if (rate) {
      const validAmount = parseFloat(amount) || 1;
      const calculatedResult = Math.round(validAmount * rate * 100) / 100;
      setResult(calculatedResult);
    } else {
      console.error('Seçilen döviz oranı bulunamadı.');
      setResult(0);
    }
  };

  return (
    <div className="currency-div">
      <div className="title">
        <h2>Currency Exchange Application</h2>
      </div>
      <div style={{ marginTop: '30px' }}>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          min={1}
          className="amount"
        />
        <select
          className="from-currency-option"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(data).map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <FaRegArrowAltCircleRight
          style={{ fontSize: '25px', marginRight: '10px' }}
        />

        <select
          className="to-currency-option"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(data).map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="result"
          value={isNaN(result) ? 0 : result}
          readOnly
        />
      </div>
      <div>
        <button onClick={exchange}>Exchange</button>
      </div>
    </div>
  );
}

export default Currency;

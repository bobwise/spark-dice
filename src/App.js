import React, { useState } from 'react';
import './App.scss';
import { SprkStack, SprkStackItem, SprkSelectionInput, SprkCenteredColumn, SprkButton } from '@sparkdesignsystem/spark-react';
import uniqueId from 'lodash/uniqueId';
import IconSet from './IconSet';

function App() {

  const [rolledDice, setRolledDice] = useState([]);
  const [newDiceType, setNewDiceType] = useState(6);
  const [total, setTotal] = useState(0);

  function addNewDice(dice) {
    dice.value = rollDice(dice.maxValue);
    setRolledDice(rolledDice.concat(dice));
    const newTotal = total + dice.value;
    setTotal(newTotal);
  }

  function rollDice(maxValue) {
    const value = Math.floor(Math.random() * maxValue) + 1;
    return value;
  }

  function clear() {
    setRolledDice([]);
    setTotal(0);
  }

  return (
    <SprkCenteredColumn additionalClasses="app sprk-u-phh sprk-u-mvl">
      <IconSet></IconSet>
      <SprkSelectionInput
        choices={[
          { label: '4', value: '4' },
          { label: '6', value: '6' },
          { label: '8', value: '8' },
          { label: '10', value: '10' },
          { label: '12', value: '12' },
          { label: '20', value: '20' },
        ]}
        variant="select"
        label="Dice Type"
        value={newDiceType}
        onChange={(e) => setNewDiceType(e.target.value)}
        additionalClasses="sprk-u-mbm"
      />
      <SprkStack itemSpacing="medium" splitAt="tiny" additionalClasses="sprk-u-mbm">
        <SprkStackItem additionalClasses="sprk-o-Stack__item--half@xs ">
          <SprkButton onClick={() => { addNewDice({ maxValue: newDiceType, id: uniqueId() }) }}>
            Roll a dice
          </SprkButton>
        </SprkStackItem>
        <SprkStackItem additionalClasses="sprk-o-Stack__item--half@xs">
          <SprkButton variant="secondary" onClick={() => { clear() }}>
            Start Over
          </SprkButton>
        </SprkStackItem>
      </SprkStack>
      <div className="sprk-u-mbm">
        Total: {total}
      </div>
      <div className="rolledDiceContainer">
        {rolledDice.map((dice) =>
          <div className={"sprk-u-AbsoluteCenter sprk-u-mbm dice d" + dice.maxValue} key={dice.id}>
            {dice.value}
          </div>
        )}
      </div>
    </SprkCenteredColumn>
  );
}

export default App;

define(['react'], function(React) {
  return React.createClass({
    componentDidUpdate: function() {
      document.location.hash = this.getUrlStateHash();
    },

    getDefaulrState: function() {
      return {
        salary: 16000,
        tuition: 0,
        hoursPerWeek: 20,
        hostelCost: 165,
        apartamentCost: 4000,
        coupled: true,
        afterMonths: 12,
        calculateSavedMoneyOfLiving: true,
        calculateSalaryLoss: true
      };
    },

    getInitialState: function() {
      var urlState = this.getStateFromUrl(),
          state = this.getDefaulrState(),
          prop;
      for (prop in state) {
        if (state.hasOwnProperty(prop) && urlState.hasOwnProperty(prop)) {
          state[prop] = urlState[prop];
        }
      }
      return state;
    },

    getRealCost: function() {
      return this.getFullTuitionCost() + this.getSalaryLoss() - this.getSavedMoneyOfLiving();
    },

    getSalaryLoss: function() {
      if (this.state.calculateSalaryLoss) {
        return this.state.salary * 18 * (1 - this.state.hoursPerWeek/40);
      } else {
        return 0;
      }
    },

    getFullTuitionCost: function() {
      return this.state.tuition * 2;
    },

    getSavedMoneyOfLiving: function() {
      if (this.state.calculateSavedMoneyOfLiving) {
        return this.state.afterMonths * (this.getCostOfApartment() - this.state.hostelCost);
      } else {
        return 0;
      }
    },

    getCostOfApartment: function() {
      return (this.state.coupled) ? this.state.apartamentCost/2 : this.state.apartamentCost;
    },

    getUrlStateHash: function() {
      var params = [],
          prop;
      for (prop in this.state) {
        if ( this.state.hasOwnProperty(prop) ) {
          params.push(prop + '=' + this.state[prop]);
        }
      }
      return '#' + params.join('&');
    },

    getStateFromUrl: function() {
      var params = {},
          hash = window.location.hash,
          pairs = hash.substring(1, hash.length).split('&');
      pairs.forEach(function(pair) {
        var result = pair.split('='),
            key = result[0],
            value = result[1];
        if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        } else {
          value = parseInt(value || 0, 10);
        }
        params[key] = value;
      });
      return params;
    },

    handleSalaryChange: function(event) {
      this.setState({salary: parseInt(event.target.value || 0, 10)});
    },

    handleTuitionChange: function(event) {
      this.setState({tuition: parseInt(event.target.value || 0, 10)});
    },

    handleHoursPerWeekChange: function(event) {
      this.setState({hoursPerWeek: parseInt(event.target.value, 10)});
    },

    handleHostelCostChange: function(event) {
      this.setState({hostelCost: parseInt(event.target.value || 0, 10)});
    },

    handleApartamentCostChange: function(event) {
      this.setState({apartamentCost: parseInt(event.target.value || 0, 10)});
    },

    handleCoupledChange: function(event) {
      var coupled = (event.target.value === '1');
      this.setState({coupled: coupled});
    },

    handleAfterMonthsChange: function(event) {
      this.setState({afterMonths: parseInt(event.target.value, 10)});
    },

    handleCalculateSavedMoneyOfLivingChange: function(event) {
      this.setState({calculateSavedMoneyOfLiving: !this.state.calculateSavedMoneyOfLiving});
    },

    handleCalculateSalaryLossChange: function(event) {
      this.setState({calculateSalaryLoss: !this.state.calculateSalaryLoss});
    },

    renderLivingFieldset: function() {
      return (
        /* jshint ignore:start */
        <fieldset>
          <div>
            <label>
              Вартість проживання гуртожитку (в міс):
              <input type="text" maxLength="10" value={this.state.hostelCost} onChange={this.handleHostelCostChange}/>
            </label>
          </div>
          <div>
            <label>
              Вартість проживання в квартирі (в міс):
              <input type="text" maxLength="10" value={this.state.apartamentCost} onChange={this.handleApartamentCostChange}/>
            </label>
          </div>
          <div>
            <label>
              Буду жити в квартирі:
              <input type="radio" name="coupled" checked={!this.state.coupled} value="0" onChange={this.handleCoupledChange}/>Сам
              <input type="radio" name="coupled" checked={this.state.coupled} value="1" onChange={this.handleCoupledChange}/>Вдвох
            </label>
          </div>
          <div>
            <label>
              Буду жити в квартирі через {this.state.afterMonths} місяців навчання:
              0<input type="range" min="0" max="21" step="1" value={this.state.afterMonths} onChange={this.handleAfterMonthsChange}/>21
            </label>
          </div>
        </fieldset>
        /* jshint ignore:end */
      );
    },

    renderSalaryFieldset: function() {
      return (
        /* jshint ignore:start */
        <fieldset>
          <div>
            <label>
              Моя заробітня плата (за повний робочий день):
              <input type="text" maxLength="10" value={this.state.salary} onChange={this.handleSalaryChange}/>
            </label>
          </div>
          <div>
            <label>
              Збираюсь працювати {this.state.hoursPerWeek} годин на тиждень:
              20<input type="range" min="20" max="40" step="5" value={this.state.hoursPerWeek} onChange={this.handleHoursPerWeekChange}/>40
            </label>
          </div>
        </fieldset>
        /* jshint ignore:end */
      );
    },

    renderFullTuitionCostResult: function() {
      return (
        /* jshint ignore:start */
        <li>Повна вартість навчання: {Math.round(this.getFullTuitionCost())} грн</li>
        /* jshint ignore:end */
      );
    },

    renderSavedMoneyOfLivingResult: function() {
      return (
        /* jshint ignore:start */
        <li>Економія на гуртожитку: {Math.round(this.getSavedMoneyOfLiving())} грн</li>
        /* jshint ignore:end */
      );
    },

    renderSalaryLossResult: function() {
      return (
        /* jshint ignore:start */
        <li>Втрачені гроші на роботі: {Math.round(this.getSalaryLoss())} грн</li>
        /* jshint ignore:end */
      );
    },

    render: function() {
      return (
        /* jshint ignore:start */
        <div>
          <div>
            <label>
              Вартість навчання (за 1 рік):
              <input type="text" maxLength="10" value={this.state.tuition} onChange={this.handleTuitionChange}/>
            </label>
          </div>
          <div>
            <label>
              Враховувати втрати заробітньої плати через навчання?
              <input type="checkbox" checked={this.state.calculateSalaryLoss} onChange={this.handleCalculateSalaryLossChange}/>
            </label>
          </div>
          {this.state.calculateSalaryLoss ? this.renderSalaryFieldset() : ''}
          <div>
            <label>
              Враховувати економію на проживання у гуртожитку?
              <input type="checkbox" checked={this.state.calculateSavedMoneyOfLiving} onChange={this.handleCalculateSavedMoneyOfLivingChange}/>
            </label>
          </div>
          {this.state.calculateSavedMoneyOfLiving ? this.renderLivingFieldset() : ''}
          <h2>Результат</h2>
          <div>
            <ul>
              {this.state.calculateSavedMoneyOfLiving || this.state.calculateSalaryLoss ? this.renderFullTuitionCostResult() : ''}
              {this.state.calculateSavedMoneyOfLiving ? this.renderSavedMoneyOfLivingResult() : ''}
              {this.state.calculateSalaryLoss ? this.renderSalaryLossResult() : ''}
              <li>Диплом магістра коштуватиме вам: <strong>{Math.round(this.getRealCost())} грн</strong></li>
            </ul>
          </div>
        </div>
        /* jshint ignore:end */
      );
    }
  });
});

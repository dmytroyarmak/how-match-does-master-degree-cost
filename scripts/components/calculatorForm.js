define(['react'], function(React) {
  return React.createClass({
    getInitialState: function() {
      return {
        salary: 16000,
        tuition: 0,
        hoursPerWeek: 20,
        hostelCost: 165,
        apartamentCost: 4000,
        coupled: true,
        afterMonths: 12
      };
    },

    getRealCost: function() {
      return this.getFullTuitionCost() + this.getSalaryLoss() - this.getSavedMoneyOfLiving();
    },

    getSalaryLoss: function() {
      return this.state.salary * 18 * (1 - this.state.hoursPerWeek/40);
    },

    getFullTuitionCost: function() {
      return this.state.tuition * 2;
    },

    getSavedMoneyOfLiving: function() {
      return this.state.afterMonths * (this.getCostOfApartment() - this.state.hostelCost);
    },

    getCostOfApartment: function() {
      return (this.state.coupled) ? this.state.apartamentCost/2 : this.state.apartamentCost;
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

    render: function() {
      return (
        /* jshint ignore:start */
        <div>
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
          <div>
            <label>
              Вартість навчання (за 1 рік):
              <input type="text" maxLength="10" value={this.state.tuition} onChange={this.handleTuitionChange}/>
            </label>
          </div>
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
          <h2>Результат</h2>
          <div>
            <ul>
              <li>Повна вартість навчання: {Math.round(this.getFullTuitionCost())} грн</li>
              <li>Втрачені гроші на роботі: {Math.round(this.getSalaryLoss())} грн</li>
              <li>Економія на гуртожитку: {Math.round(this.getSavedMoneyOfLiving())} грн</li>
              <li>Диплом магістра коштуватиме вам: <strong>{Math.round(this.getRealCost())} грн</strong></li>
            </ul>
          </div>
        </div>
        /* jshint ignore:end */
      );
    }
  });
});
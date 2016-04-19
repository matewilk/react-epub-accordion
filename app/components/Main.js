var React = require('react'),
    ReactDOM = require('react-dom'),
    classNames = require('classnames'),
    Loader = require('react-loader');

require('../styles/main.scss');

var AccordionHeader = React.createClass({
    handleClick: function(event){
        var customEvent = new CustomEvent('click-accordion-header', {
            detail: {tab: this.props.tabNo},
            bubbles: true
        });
        event.target.dispatchEvent(customEvent);
    },
    render: function(){
        var classes = {
            'accordion-active': this.props.active
        }
        return (
            <div className={classNames("panel-heading", classes)} onClick={this.handleClick}>
                {this.props.title}
            </div>
        );
    }
});

var AccordionContent = React.createClass({
    getInitialState: function(){
        return {
            loaded: false
        }
    },
    componentWillReceiveProps: function(nextProps){
        var self = this;
        setTimeout(function(){
            self.setState({loaded: nextProps.open});
        },1500);
    },
    render: function(){
        var classes = {
            'accordion-open': this.props.open
        }
        return (
            <div className={classNames("panel-body", classes)}>
                <Loader loaded={this.state.loaded}>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </Loader>
            </div>
        );
    }
});

var AccordionTab = React.createClass({
    render: function(){
        return (
            <div className="panel panel-primary">
                <AccordionHeader title={this.props.title} tabNo={this.props.tabNo} active={this.props.open}/>
                <AccordionContent open={this.props.open} />
            </div>
        );
    }
});

var Accordion = React.createClass({
    getInitialState:function() {
        return {
            activeTab: 1,
            tabs: [
                {tabNo: 1, open: true, title: 'Dictionary'},
                {tabNo: 2, open: false, title: 'Translator'},
                {tabNo: 3, open: false, title: 'Wiki'}
            ]
        }
    },
    componentWillMount: function(){
        window.addEventListener("click-accordion-header", this.openAccordionTab, false);
    },
    componentWillUnmount: function(){
        window.removeEventListener("click-accordion-header", this.openAccordionTab, false);
    },
    openAccordionTab: function(event){
        this.setState({activeTab: event.detail.tab})
    },
    getTabs: function(){
        return this.state.tabs.map(function(tab, index){
            return <AccordionTab
                        key={tab.tabNo}
                        tabNo={tab.tabNo}
                        open={tab.tabNo === this.state.activeTab}
                    title={tab.title} />
        }.bind(this));
    },
    render: function(){
        return (
            <div>
                {this.getTabs()}
            </div>
        );
    }
});

var Main = React.createClass({
    render: function(){
        return (
            <div className="my-component">
                <Accordion />
            </div>
        );
    }
});
ReactDOM.render(<Main />, document.getElementById('app'));

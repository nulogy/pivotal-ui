import '../spec_helper';
import {PortalSource, PortalDestination} from '../../../src/react/portals';

describe('Portals', () => {
  let subject;

  class Potato extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const {cake} = this.state;
      return (<div className="potato">{cake ? 'cake is a lie' : 'Potato'}</div>);
    }
  }

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(root);
  });

  describe('when there is more than one destination portal with the same name', () => {
    beforeEach(() => {
      spyOn(console, 'warn');

      subject = ReactDOM.render(
        <div>
          <div className="orange">
            <PortalDestination name="chell"/>
          </div>
          <div className="orange">
            <PortalDestination name="chell"/>
          </div>
          <div className="blue">
            <PortalSource name="chell">
              <div className="lemon"/>
            </PortalSource>
          </div>
        </div>, root);
    });

    it('warns', () => {
      expect(console.warn).toHaveBeenCalledWith('Warning: Multiple destination portals with the same name "chell" detected.');
    });
  });

  describe('when there is more than one source portal with the same name', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <div>
          <div className="orange">
            <PortalDestination name="chell"/>
          </div>
          <div className="blue">
            <PortalSource name="chell">
              <div className="potato"/>
            </PortalSource>
          </div>
          <div className="blue">
            <PortalSource name="chell">
              <div className="lemon"/>
            </PortalSource>
          </div>
        </div>, root);
    });

    it('renders the content for both source portals in the destination portal', () => {
      expect('.orange:eq(0) .potato').toHaveLength(1);
      expect('.orange:eq(0) .lemon').toHaveLength(1);

      expect('.blue:eq(0) .potato').toHaveLength(0);
      expect('.blue:eq(0) .lemon').toHaveLength(0);
    });
  });

  describe('when the portals are rendered source first then destination', () => {
    class Context extends React.Component {
      constructor(props) {
        super(props);
        this.state = {visible: true};
      }

      render() {
        return (
          <div>
            <div className="blue">
              {this.state.visible && <PortalSource name="chell">
                <Potato ref="potato"/>
              </PortalSource>}
            </div>
            <div className="orange">
              <PortalDestination name="chell"/>
            </div>
          </div>
        );
      }
    }

    beforeEach(() => {
      subject = ReactDOM.render(<Context/>, root);
    });

    it('does not render the source portal content', () => {
      expect('.blue').not.toHaveText('Potato');
    });

    it('renders the source portal into the destination portal', () => {
      expect('.orange').toHaveText('Potato');
    });

    describe('when the blue contents change', () => {
      beforeEach(() => {
        subject.refs.potato.setState({cake: true});
      });

      it('updates in the destination portal', () => {
        expect('.orange').not.toHaveText('Potato');
        expect('.orange').toHaveText('cake is a lie');
      });
    });

    describe('when the blue contents unmount', () => {
      beforeEach(() => {
        subject.setState({visible: false});
      });

      it('cleans up the div in the destination portal', () => {
        expect('.orange div').toHaveLength(1);
      });
    });
  });

  describe('when the portals are rendered destination first then source', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <div>
          <div className="orange">
            <PortalDestination name="chell"/>
          </div>
          <div className="blue">
            <PortalSource name="chell">
              <Potato/>
            </PortalSource>
          </div>
        </div>, root);
    });

    it('does not render the source portal content', () => {
      expect('.blue:eq(0)').not.toHaveText('Potato');
    });

    it('renders the source portal into the destination portal', () => {
      expect('.orange:eq(0)').toHaveText('Potato');
    });
  });

  describe('with multiple portal pairs', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <div>
          <div className="orange-chell">
            <PortalDestination name="chell"/>
          </div>
          <div className="blue-chell">
            <PortalSource name="chell">
              <Potato/>
            </PortalSource>
          </div>
          <div className="orange-wheatley">
            <PortalDestination name="wheatley"/>
          </div>
          <div className="blue-wheatley">
            <PortalSource name="wheatley">
              <div>Okay don't panic! Alright? Stop panicking! I can still stop this. Ahh. Oh there's a password. It's fine. I'll just hack it. Not a problem... umm...</div>
            </PortalSource>
          </div>
        </div>, root);
    });

    it('renders the source portal contents in the correct destination portals', () => {
      expect('.orange-chell:eq(0)').toHaveText('Potato');
      expect('.orange-wheatley:eq(0)').toContainText('Stop panicking!');
    });
  });

  describe('when the source is rendered significantly after the destination', () => {
    it('renders the source portal into the destination portal', () => {
      ReactDOM.render((<div><div className="orange"><PortalDestination name="chell"/></div></div>), root);
      expect('.orange').not.toHaveText('Potato');
      ReactDOM.render(<div><div className="orange"><PortalDestination name="chell"/></div><div className="blue">
        <PortalSource name="chell">
          <Potato/>
        </PortalSource>
      </div></div>, root);
      expect('.blue').not.toHaveText('Potato');
      expect('.orange').toHaveText('Potato');
    });
  });
});

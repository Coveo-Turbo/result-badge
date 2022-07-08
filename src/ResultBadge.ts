import {
    Component,
    IComponentBindings,
    IFieldOption,
    ComponentOptions,
    Dom,
    Utils,
    $$,
    IQueryResult,
    l,
    state,
} from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface ResultBadgeOptions {
    field?: IFieldOption;
    textColor: string;
    backgroundColor: string;
    shouldBeLocalized?: boolean;
    tab?: string[];
    tabNot?: string[];
}

@lazyComponent
export class ResultBadge extends Component {
    static ID = 'ResultBadge';

    static options: ResultBadgeOptions = {
        field: ComponentOptions.buildFieldOption({ defaultValue: '@syssource' }),
        textColor: ComponentOptions.buildStringOption({ defaultValue: '#FFF' }),
        backgroundColor: ComponentOptions.buildStringOption({ defaultValue: '#000' }),
        shouldBeLocalized: ComponentOptions.buildBooleanOption({ defaultValue: false }),
        tab: ComponentOptions.buildListOption(),
        tabNot: ComponentOptions.buildListOption(),
    };

    protected container: Dom;

    constructor(public element: HTMLElement, public options: ResultBadgeOptions, public bindings: IComponentBindings, public result?: IQueryResult) {
        super(element, ResultBadge.ID, bindings);
        this.options = Coveo.ComponentOptions.initComponentOptions(element, ResultBadge, options);

        this.render()
    }

    protected isAcceptedTab(): boolean {
        if (!this.options.tab) {
            return true;
        }

        return this.options.tab.includes(state(this.root, 't'));
    }

    protected isRejectedTab(): boolean {
        if (!this.options.tabNot) {
            return false;
        }

        return this.options.tabNot.includes(state(this.root, 't'));
    }

    protected getValue(field: IFieldOption): string {
        let value = Utils.getFieldValue(this.result, <string>field);
        if (!_.isArray(value) && _.isObject(value)) {
            value = '';
        }
        if (_.isArray(value)) {
            value = value.join(',');
        }
        return value;
    }

    protected render() {
        if (!this.isAcceptedTab() || this.isRejectedTab()) {
            this.element.setAttribute('style', 'display: none');
            return;
        }

        let textValue = this.getValue(this.options.field);
        if (textValue) {
            this.element.setAttribute('style', 'display: inline');
            if (this.options.shouldBeLocalized) { textValue = l(textValue); }
            this.element.innerText = textValue;
            this.element.style.color = this.options.textColor;
            this.element.style.backgroundColor = this.options.backgroundColor;
        } else {
            this.element.setAttribute('style', 'display: none');
        }
    }
};

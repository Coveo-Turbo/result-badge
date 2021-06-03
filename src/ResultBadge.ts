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
} from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface ResultBadgeOptions {
    field?: IFieldOption;
    textColor: string;
    backgroundColor: string;
    shouldBeLocalized?: boolean;
}

@lazyComponent
export class ResultBadge extends Component {
    static ID = 'ResultBadge';

    static options: ResultBadgeOptions = {
        field: ComponentOptions.buildFieldOption({ defaultValue: '@syssource' }),
        textColor: ComponentOptions.buildStringOption({ defaultValue: '#FFF' }),
        backgroundColor: ComponentOptions.buildStringOption({ defaultValue: '#000' }),
        shouldBeLocalized: ComponentOptions.buildBooleanOption({ defaultValue: false })
    };

    protected container: Dom;

    constructor(public element: HTMLElement, public options: ResultBadgeOptions, public bindings: IComponentBindings, public result?: IQueryResult) {
        super(element, ResultBadge.ID, bindings);
        this.options = Coveo.ComponentOptions.initComponentOptions(element, ResultBadge, options);

        this.render()
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
        let textValue = this.getValue(this.options.field);
        if (this.options.shouldBeLocalized) { textValue = l(textValue); }
        this.element.innerText = textValue;
        this.element.style.color = this.options.textColor;
        this.element.style.backgroundColor = this.options.backgroundColor;
    }
};

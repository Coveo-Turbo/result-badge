import {
    Component,
    IComponentBindings,
    IFieldOption,
    ComponentOptions,
    Dom,
    Utils,
    $$,
    IQueryResult
} from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface ResultBadgeOptions {
    field?: IFieldOption;
    textColor: string;
    backgroundColor: string;
}

@lazyComponent
export class ResultBadge extends Component {
    static ID = 'ResultBadge';

    static options: ResultBadgeOptions = {
        field: ComponentOptions.buildFieldOption({defaultValue: '@syssource'}),
        textColor: ComponentOptions.buildStringOption({defaultValue: 'white'}),
        backgroundColor: ComponentOptions.buildStringOption({defaultValue: 'black'})
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
        const textValue = this.getValue(this.options.field);
        this.element.innerText = textValue;
        this.element.style.color = this.options.textColor;
        this.element.style.backgroundColor = this.options.backgroundColor;
    }
};

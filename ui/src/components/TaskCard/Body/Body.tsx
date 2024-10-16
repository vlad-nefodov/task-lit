import { ComponentPropsWithoutRef, FC } from 'react';
import {
  faCalendarDays,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

import Badge from '../../ui/Badge/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '../../ui/Select/Select';
import { SelectValue } from '../../ui/Select/Select.types';
import { format } from 'date-fns';
import styles from './Body.module.scss';

export interface TaskList {
  id: string;
  name: string;
}
export interface BodyProps extends ComponentPropsWithoutRef<'div'> {
  description: string;
  dueDate: string;
  priority: string;
  lists: TaskList[];
  onChangeList: (id: string) => void;
}

const Body: FC<BodyProps> = (props) => {
  const { description, dueDate, priority, lists, onChangeList } = props;

  const onChangeListHandler = (value: SelectValue) => {
    if (typeof value === 'string') {
      onChangeList(value);
    }
  };

  const getListSelectItems = () => {
    return lists.map((b) => (
      <Select.Content.Item value={b.id} key={b.id}>
        {b.name}
      </Select.Content.Item>
    ));
  };

  return (
    <div className={styles.body}>
      <div className={styles['body__description']}>{description}</div>
      <div className={styles['body__date']}>
        <FontAwesomeIcon icon={faCalendarDays} />
        {format(dueDate, 'E, d MMM')}
      </div>
      <Badge className={styles['body__priority']} decorated>
        {priority}
      </Badge>
      <Select onValueChange={onChangeListHandler}>
        <Select.Trigger>
          <Select.Trigger.Value placeholder='Move to...' />
          <Select.Trigger.Icon>
            <FontAwesomeIcon icon={faChevronDown} />
          </Select.Trigger.Icon>
        </Select.Trigger>
        <Select.Content>{getListSelectItems()}</Select.Content>
      </Select>
    </div>
  );
};

export default Body;
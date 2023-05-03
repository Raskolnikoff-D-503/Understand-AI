import React, {useCallback, useMemo, useState} from 'react';
import {useAppSelector} from '@/app/store';
import {useLocalStorage} from '@/app/services/localStorageController/hooks';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {DragAndDropContainer} from '@/features';
import {Accordion, Card, EmptyState, List, ToggleSwitch} from '@/shared/UI';

import './SavedChatGPTRepliesWidget.scss';

// ('Name: John Doe\nEmail: johndoe@email.com\nPhone: (123) 456-7890 \n\nObjective:\nTo obtain a Middle Frontend Developer position using my experience in web development and design, as well as my attention to detail and passion for creating user-friendly interfaces. \n\nSummary: \nI am an experienced front-end developer with a passion for creating clean, modern, and responsive websites. With over five years of experience in web design and development, I excel at translating client needs into successful web designs. I am highly skilled in JavaScript, HTML5, and CSS3, and have experience with Adobe Creative Suite, WordPress, and various other web development tools. I am a team player who values collaboration and communication, and enjoy working in a fast-paced, dynamic environment.\n\nEducation:\nBachelor of Science in Computer Science\nXYZ University, XYZ City\nGraduated: May 20XX\n\nSkills:\n- Proficient in HTML5, CSS3, JavaScript, and various JavaScript libraries\n- Experience with Adobe Creative Suite and other design tools\n- Experienced with WordPress and other CMS platforms\n- Ability to write efficient and readable code using various programming paradigms\n- Strong communication skills and able to work collaboratively\n- Familiarity with Agile development methodologies\n\nExperience:\n\nFrontend Developer\nABC Company, XYZ City\nSeptember 20XX – Present\n\nResponsibilities:\n- Collaborate with the design team to create user-friendly, responsive, and engaging interfaces\n- Develop front-end functionality using HTML5, CSS3, JavaScript, AngularJS, and React\n- Design and develop WordPress themes and plugins\n- Optimize website designs for SEO and performance\n- Stay up-to-date with the latest web development trends and best practices\n\nWeb Developer\nDEF Company, XYZ City\nJune 20XX – August 20XX\n\nResponsibilities:\n- Worked with a team of developers to design and develop interactive websites and mobile applications using HTML, CSS, and JavaScript\n- Wrote efficient and maintainable code following best practices and coding standards\n- Collaborated with the design team to ensure smooth implementation of web designs\n- Contributed to user testing and debugging efforts to ensure a seamless user experience\n\nCertifications:\n- Google Analytics Certification\n- HubSpot Inbound Certification \n\nLanguages: \nEnglish (Fluent), Spanish (Intermediate)\n\nReferences:\nAvailable upon request.');

type Props = {
  id: string;
  className: string;
};

type ItemType = {
  id: string;
  className: string;
  Component: ({id, className}: Props) => JSX.Element;
};

export const SavedChatGPTRepliesWidget = ({id, className}: Props) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);

  const isDraggable = useAppSelector(selectIsOnEdit);

  const [items, setItems] = useLocalStorage<{id: string; title: string; content: string}[]>(
    'responses',
    [],
  );

  const configuratedItems = useMemo<ItemType[]>(
    () =>
      items
        ? items.map<ItemType>((item) => ({
            id: item.id,
            className: 'saved-chat-gpt-replies-widget__item',
            Component: ({id, className}) => (
              <div id={id} className={className}>
                <Accordion title={item.title} isDraggable={isOnEdit}>
                  <p>{item.content}</p>
                </Accordion>
              </div>
            ),
          }))
        : [],
    [items, isOnEdit],
  );

  const updateDataHandler = useCallback(
    (data: ItemType[]) => {
      console.log(data);

      if (items) {
        const ids = data.map((item) => item.id);

        const sortedItems = items.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));

        setItems(sortedItems);
      }
    },
    [items],
  );

  return (
    <Card id={id} className={className} isDraggable={isDraggable} title="Saved Chat GPT Replies">
      <div className="saved-chat-gpt-replies-widget">
        <div className="saved-chat-gpt-replies-widget__toggle-switch-wrapper">
          <ToggleSwitch
            name="saved-chat-gpt-replies-widget"
            checked={isOnEdit}
            onChange={setIsOnEdit}
          />
        </div>
        {Boolean(configuratedItems.length) && isOnEdit && (
          <DragAndDropContainer
            className="saved-chat-gpt-replies-widget__drag-and-drop-container"
            data={configuratedItems}
            updateDataHandler={updateDataHandler}
          />
        )}
        {Boolean(configuratedItems) && !isOnEdit && (
          <List className="saved-chat-gpt-replies-widget__container">
            {configuratedItems.map((item) => {
              const {id, className, Component} = item;

              return <Component key={id} id={id} className={className} />;
            })}
          </List>
        )}
        {!configuratedItems.length && <EmptyState message="The List Is Empty" />}
      </div>
    </Card>
  );
};

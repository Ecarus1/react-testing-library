import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//userEvent - эмулирует полноценное взаимодействие ситемы, как будто это делает пользователь
import App from './App';
//fiteEvent - это объект предназначен целенаправленно для работы с событиями (Здесь есть click, change, input, draganddrop)


//get работает таким образом, что он 100% должен найти какой-то элемент. Если этот элемент не находится - пробрасывается ошибка и тест падает

//query. Если мы используем query, то мы можем убедиться в том, что какого-то элемента нет.
// Т.е. если мы этот элемент не получим мы можем убедиться что у нас значение переменной = null и таким образом ошибки у нас не будет
// Вывод - такой метод использутеся чаще всего, когда мы хотим доказать отсутсвие элемента, нежели как найти его в get

//find возвращает объект завёрнутый в промис! Это говорит о том, что find используется для того, чтобы работать с каким то асинхронным кодом
describe('TEST APP', () => {
    test('renders learn react link', () => {
        render(<App />);
        const helloWorldElem = screen.getByText(/hello world/i); //когда передаём сторуку нужно точное совпадение. Правильнее будет передать регулярное выражение (флаг i - игнорирование регистра)
        const btn = screen.getByRole('button');                  //Находим кнопку по её роли
        const input = screen.getByPlaceholderText(/vAaaluess..../i);
        expect(helloWorldElem).toBeInTheDocument(); //toBeInTheDocument элемент появился на странице
        expect(btn).toBeInTheDocument();
        expect(input).toMatchSnapshot();
    });
~
    test('should ', async () => {
        render(<App />)
        // const helloWorldElem = screen.queryByText(/hello2/i);
        // expect(helloWorldElem).toBeNull();
        // screen.debug();
        const helloWorldElem = await screen.findByText(/data/i);
        expect(helloWorldElem).toBeInTheDocument();
        expect(helloWorldElem).toHaveStyle({color: 'red'});
        // screen.debug();
    });

    //В этом примере была проблема! была попытка получить элемент, который ещё не существовал на странице с testId toggle-elem (Пришлось это сделавать внутри expect)
    test('Click Event', () => {
        render(<App />)
        const btn = screen.getByTestId('toggle-btn');
        // const toggleDiv = screen.queryByTestId('toggle-elem');
        expect(screen.queryByTestId('toggle-elem')).toBeNull(); //Ожидаем, что еэлемента на странице пока что нет
        fireEvent.click(btn)
        expect(screen.queryByTestId('toggle-elem')).toBeInTheDocument();
        fireEvent.click(btn)
        expect(screen.queryByTestId('toggle-elem')).toBeNull(); //Ожидаем, что еэлемента на странице пока что нет
    });

    test('Input Event', () => {
        render(<App />)
        const input = screen.getByPlaceholderText(/vAaaluess..../i);
        // const toggleDiv = screen.queryByTestId('toggle-elem');
        expect(screen.queryByTestId('value-elem')).toContainHTML(''); //ожидаем что в начале, кроме пустой строки ничего нету
        //Как итог, fireEvent позволяет работать с событиями (искуственное взаимодействие)
        // fireEvent.input(input, {
        //     target: {
        //         value: '123123'
        //     }
        // })
        userEvent.type(input, '123123')
        expect(screen.queryByTestId('value-elem')).toContainHTML('123123');
    });
});

class Content {
  static displayContent = (rootElement) => {
    const mainContent = document.createElement('div');
    mainContent.setAttribute('class', 'card centered-content pt-5 col-md-6 col-12');
    mainContent.textContent = 'Main Content';
    rootElement.append(mainContent);
  }
}

export default Content;
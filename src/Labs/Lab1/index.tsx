export default function Lab1() {
    return(
        <div id="wd-lab1">
            <h2>Lab 1</h2>
            <div id="wd-p-tag">
                <h4>Paragraph Tag</h4>
                <p id="wd-p-1">
                This is a paragraph. We often separate a long set of sentences with vertical spaces to make the text easier to read. Browsers ignore vertical white spaces and render all the text as one single set of sentences. To force the browser to add vertical spacing, wrap the paragraphs you want to separate with the paragraph tag.
                </p>
                <p id="wd-p-2">
                This is the first paragraph. The paragraph tag is used to format vertical gaps between long pieces of text like this one.
                </p>
                <p id="wd-p-3">
                This is the second paragraph. Even though there is a deliberate white gap between the paragraph above and this paragraph, by default browsers render them as one contiguous piece of text as shown here on the right.
                </p>
                <p id="wd-p-4">
                This is the third paragraph. Wrap each paragraph with the paragraph tag to tell browsers to render the gaps.
                </p>
            </div>
            
            <div id="wd-lists">
                <h4>List Tags</h4>
                <h5>Ordered List Tag</h5>
                How to make pancakes:
                <ol id="wd-pancakes">
                <li>Mix dry ingredients.</li>
                <li>Add wet ingredients.</li>
                <li>Stir to combine.</li>
                <li>Heat a skillet or griddle.</li>
                <li>Pour batter onto the skillet.</li>
                <li>Cook until bubbly on top.</li>
                <li>Flip and cook the other side.</li>
                <li>Serve and enjoy!</li>
                </ol>
                <h5>Unordered List Tag</h5>
                My favorite books (in no particular order)
                <ul id="wd-my-books">
                    <li>Dune</li>
                    <li>Lord of the Rings</li>
                    <li>Ender's Game</li>
                    <li>Red Mars</li>
                    <li>The Forever War</li>
                </ul>
            </div>

            <div id="wd-tables">
                <h4>Table Tag</h4>
                <table border={1} width="100%">	{/* table, border, width */}
                <thead>					{/* table headings */}
                    <tr>						{/* table row */}
                    <th>Quiz</th>				{/* table heading*/}
                    <th>Topic</th>
                    <th>Date</th>
                    <th>Grade</th>
                    </tr>
                </thead>
                <tbody>					{/* table body */}
                    <tr>						{/* table row */}
                    <td>Q1</td>				{/* table data / cell */}
                    <td>HTML</td>
                    <td>2/3/21</td>
                    <td>85</td>
                    </tr>

                    <tr>						{/* table row */}
                    <td>Q2</td>				{/* table data / cell */}
                    <td>CSS</td>
                    <td>3/3/21</td>
                    <td>90</td>
                    </tr>

                    <tr>						{/* table row */}
                    <td>Q3</td>				{/* table data / cell */}
                    <td>JavaScript</td>
                    <td>4/3/21</td>
                    <td>95</td>
                    </tr>
                </tbody>
                <tfoot>					{/* table row */}
                    <tr>
                    <td colSpan={3}>Average</td>	{/* column span */}
                    <td>90</td>
                    </tr>
                </tfoot>
                </table>
            </div>

            <div id="wd-forms">
                <h4>Form Elements</h4>
                <form id="wd-text-fields">
                    <h5>Text Fields</h5>
                    <label htmlFor="wd-text-fields-username">Username:</label>
                    <input id="wd-text-fields-username" placeholder="e.g., jdoe" /> <br />
                    <label htmlFor="wd-text-fields-password">Password:</label>
                    <input type="password" id="wd-text-fields-password" value="123@#$asd" />
                    <br />
                    <label htmlFor="wd-text-fields-first-name">First name:</label>
                    <input type="text" id="wd-text-fields-first-name" title="John" /> <br />
                    <label htmlFor="wd-text-fields-last-name">Last name:</label>
                    <input type="text" id="wd-text-fields-last-name" placeholder="Doe"
                    value="Wonderland" title="The last name" />
                
                    <h5>Text boxes</h5>
                    <label>Biography:</label><br />
                    <textarea id="wd-textarea" cols={30} rows={10}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </textarea>

                    <h5 id="wd-buttons">Buttons</h5>
                    <button id="wd-all-good" onClick={() => alert("Life is Good!")} type="button">
                    Hello World!
                    </button>

                    <h5 id="wd-radio-buttons">Radio buttons</h5>

                    <label>Favorite movie genre:</label><br />

                    <input type="radio" name="radio-genre" id="wd-radio-comedy"/>
                    <label htmlFor="wd-radio-comedy">Comedy</label><br />

                    <input type="radio" name="radio-genre" id="wd-radio-drama"/>
                    <label htmlFor="wd-radio-drama">Drama</label><br />

                    <input type="radio" name="radio-genre" id="wd-radio-scifi"/>
                    <label htmlFor="wd-radio-scifi">Science Fiction</label><br />

                    <input type="radio" name="radio-genre" id="wd-radio-fantasy"/>
                    <label htmlFor="wd-radio-fantasy">Fantasy</label><br />


                    <label>Favorite colors:</label><br />

                    <input type="radio" name="radio-colors" id="wd-radio-yellow"/>
                    <label htmlFor="wd-radio-yellow">Yellow</label><br />

                    <input type="radio" name="radio-colors" id="wd-radio-red"/>
                    <label htmlFor="wd-radio-red">Red</label><br />

                    <input type="radio" name="radio-colors" id="wd-radio-blue"/>
                    <label htmlFor="wd-radio-blue">Blue</label><br />

                    <input type="radio" name="radio-colors" id="wd-radio-green"/>
                    <label htmlFor="wd-radio-green">Green</label>

                    <h5 id="wd-checkboxes">Checkboxes</h5>
                    <label>Favorite movie genre:</label><br/>

                    <input type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
                    <label htmlFor="wd-chkbox-comedy">Comedy</label><br/>

                    <input type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
                    <label htmlFor="wd-chkbox-drama">Drama</label><br/>

                    <input type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
                    <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br/>

                    <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
                    <label htmlFor="wd-chkbox-fantasy">Fantasy</label>

                    <h4 id="wd-dropdowns">Dropdowns</h4>

                    <h5>Select one</h5>
                    <label htmlFor="wd-select-one-genre"> Favorite movie genre: </label><br/>
                    <select id="wd-select-one-genre">
                    <option value="COMEDY">Comedy</option>
                    <option value="DRAMA">Drama</option>
                    <option selected value="SCIFI">
                        Science Fiction</option>
                    <option value="FANTASY">Fantasy</option>
                    </select>

                    <h5>Select many</h5>
                    <label htmlFor="wd-select-many-genre"> Favorite movie genres: </label><br/>
                    <select id="wd-select-many-genre" multiple>
                    <option selected value="COMEDY">Comedy</option>
                    <option value="DRAMA">Drama</option>
                    <option selected value="SCIFI">
                        Science Fiction</option>
                    <option value="FANTASY">Fantasy</option>
                    </select>

                    <h4>Other HTML field types</h4>

                    <label htmlFor="wd-text-fields-salary-start"> Starting salary:
                    </label>
                    <input type="number"
                        id="wd-text-fields-salary-start"
                        placeholder="1000"
                        min="50000"
                        max="1000000"
                        /><br/>

                    <label htmlFor="wd-text-fields-rating"> Rating: </label>
                    <input type="range" id="wd-text-fields-rating"
                        placeholder="Doe"
                        max="5"
                        value="5"/><br/>

                    <label htmlFor="wd-text-fields-email"> Email: </label>
                    <input type="email"
                        placeholder="jdoe@somewhere.com"
                        id="wd-text-fields-email"/><br/>

                    <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
                    <input type="date"
                        id="wd-text-fields-dob"
                        value="2000-01-21"/><br/>


                </form>
            </div>
            <div id="wd-anchors">
                <h3>Anchor Tags</h3>
                <a href="https://wikipedia.org">Wikipedia</a><br />
                <a href="https://github.com/tringuyen1086">Github</a>
            </div>




        </div>      
    )
}
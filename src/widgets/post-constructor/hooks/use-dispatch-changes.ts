import {
	changeEditorValue,
	changeLinesCount,
	changeViewValue,
	selectAutoRenderTime,
	selectEditorValue
} from "@widgets/post-constructor";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import markdownit from "markdown-it";
import hljs from "highlight.js";

export function useDispatchChanges(): [string, (value: string) => void] {
	const md = markdownit({
		html: true,
		linkify: true,
		typographer: true,
		xhtmlOut: true,
		highlight: (str, lang) => {
			if (lang && hljs.getLanguage(lang)) {
				return hljs.highlight(str, {language: lang}).value;
			}

			return '';
		}
	});

	const dispatch = useDispatch();

	const editorValue = useSelector(selectEditorValue);
	const autoRenderTime = useSelector(selectAutoRenderTime);

	const handleChange = (value: string) => {
		const lines = countLinesInText(value);

		dispatch(changeEditorValue(value));
		dispatch(changeLinesCount(lines));
	}

	// dispatch changeViewValue with debounce of autoRenderTime
	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			dispatch(changeViewValue(md.render(editorValue)));
		}, autoRenderTime);

		return () => clearTimeout(debounceTimer);
	}, [editorValue]);

	const countLinesInText = (data: string) => {
		return data.split(/\r\n|\r|\n/).length;
	}

	return [editorValue, handleChange];
}
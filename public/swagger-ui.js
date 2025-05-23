$(function() {

	// Helper function for vertically aligning DOM elements
	// http://www.seodenver.com/simple-vertical-align-plugin-for-jquery/
	$.fn.vAlign = function() {
		return this.each(function(i){
		var ah = $(this).height();
		var ph = $(this).parent().height();
		var mh = (ph - ah) / 2;
		$(this).css('margin-top', mh);
		});
	};

	$.fn.stretchFormtasticInputWidthToParent = function() {
		return this.each(function(i){
		var p_width = $(this).closest("form").innerWidth();
		var p_padding = parseInt($(this).closest("form").css('padding-left') ,10) + parseInt($(this).closest("form").css('padding-right'), 10);
		var this_padding = parseInt($(this).css('padding-left'), 10) + parseInt($(this).css('padding-right'), 10);
		$(this).css('width', p_width - p_padding - this_padding);
		});
	};

	$('form.formtastic li.string input, form.formtastic textarea').stretchFormtasticInputWidthToParent();

	// Vertically center these paragraphs
	// Parent may need a min-height for this to work..
	$('ul.downplayed li div.content p').vAlign();

	// When a sandbox form is submitted..
	$("form.sandbox").submit(function(){

		var error_free = true;

		// Cycle through the forms required inputs
 		$(this).find("input.required").each(function() {

			// Remove any existing error styles from the input
			$(this).removeClass('error');

			// Tack the error style on if the input is empty..
			if ($(this).val() == '') {
				$(this).addClass('error');
				$(this).wiggle();
				error_free = false;
			}

		});

		return error_free;
	});

});

function clippyCopiedCallback(a) {
  $('#api_key_copied').fadeIn().delay(1000).fadeOut();

  // var b = $("#clippy_tooltip_" + a);
  // b.length != 0 && (b.attr("title", "copied!").trigger("tipsy.reload"), setTimeout(function() {
  //   b.attr("title", "copy to clipboard")
  // },
  // 500))
}

// Logging function that accounts for browsers that don't have window.console
function log() {
  if (window.console) console.log.apply(console,arguments);
}
  
var Docs = {

	shebang: function() {

		// If shebang has an operation nickname in it..
		// e.g. /docs/#!/words/get_search
		var fragments = $.param.fragment().split('/');
		fragments.shift(); // get rid of the bang

		switch (fragments.length) {
			case 1:
				// Expand all operations for the resource and scroll to it
//				log('shebang resource:' + fragments[0]);
				var dom_id = 'resource_' + fragments[0];

				Docs.expandEndpointListForResource(fragments[0]);
				$("#"+dom_id).slideto({highlight: false});
				break;
			case 2:
				// Refer to the endpoint DOM element, e.g. #words_get_search
//				log('shebang endpoint: ' + fragments.join('_'));

                // Expand Resource
                Docs.expandEndpointListForResource(fragments[0]);
                $("#"+dom_id).slideto({highlight: false});

                // Expand operation
				var li_dom_id = fragments.join('_');
				var li_content_dom_id = li_dom_id + "_content";

//                log("li_dom_id " + li_dom_id);
//                log("li_content_dom_id " + li_content_dom_id);

				Docs.expandOperation($('#'+li_content_dom_id));
				$('#'+li_dom_id).slideto({highlight: false});
				break;
		}

	},

	toggleEndpointListForResource: function(resource) {
		var elem = $('li[id^=resource_' + Docs.escapeResourceName(resource) + '] ul.endpoints');
		if (elem.is(':visible')) {
			Docs.collapseEndpointListForResource(resource);
		} else {
			Docs.expandEndpointListForResource(resource);
		}
	},

	// Expand resource
	expandEndpointListForResource: function(resource) {
		$('[id^=resource_' + resource + ']').addClass('active');

		var elem = $('li[id^=resource_' + Docs.escapeResourceName(resource) + '] ul.endpoints');
		elem.slideDown();
	},

	// Collapse resource and mark as explicitly closed
	collapseEndpointListForResource: function(resource) {
		$('[id^=resource_' + resource + ']').removeClass('active');

		var elem = $('li[id^=resource_' + Docs.escapeResourceName(resource) + '] ul.endpoints');
		elem.slideUp();
	},

	expandOperationsForResource: function(resource) {
		// Make sure the resource container is open..
		Docs.expandEndpointListForResource(resource);
		$('li[id^=resource_' + Docs.escapeResourceName(resource) + '] li.operation div.content').each(function() {
			Docs.expandOperation($(this));
		});
	},

	collapseOperationsForResource: function(resource) {
		// Make sure the resource container is open..
		Docs.expandEndpointListForResource(resource);
		$('li[id^=resource_' + Docs.escapeResourceName(resource) + '] li.operation div.content').each(function() {
			Docs.collapseOperation($(this));
		});
	},

	escapeResourceName: function(resource) {
		 return resource.replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^`{|}~]/g, "\\$&")
	},

	expandOperation: function(elem) {
		elem.slideDown();
	},

	collapseOperation: function(elem) {
		elem.slideUp();
	}

};(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class='container' id='resources_container'>\n    <ul id='resources'>\n    </ul>\n\n    <div class=\"footer\" style=\"float:right; margin-top: 100px\">\n        <h4 style=\"color: #AAAAAA;\"> ";
  foundHelper = helpers.basePath;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.basePath; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['operation'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n                <h4>Implementation Notes</h4>\n                <p>";
  foundHelper = helpers.notes;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.notes; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n                ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <h4>Response Information</h4>\n                    ";
  stack1 = depth0.responseClassSignature;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n                        <p><span class=\"model-signature\">";
  foundHelper = helpers.responseClassSignature;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.responseClassSignature; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span></p>\n                    ";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n                        <p>";
  foundHelper = helpers.responseClass;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.responseClass; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n                    ";
  return buffer;}

function program8(depth0,data) {
  
  
  return "\n                    ";}

function program10(depth0,data) {
  
  
  return "\n                    <div class='sandbox_header'>\n                        <input class='submit' name='commit' type='button' value='Try it out!' />\n                        <a href='#' class='response_hider' style='display:none'>Hide Response</a>\n                        <img alt='Throbber' class='response_throbber' src='/vendor/lararestler/images/throbber.gif' style='display:none' />\n                    </div>\n                    ";}

  buffer += "\n    <ul class='operations' >\n        <li class='";
  foundHelper = helpers.httpMethod;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.httpMethod; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " operation' id='";
  foundHelper = helpers.resourceName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.resourceName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_";
  foundHelper = helpers.nickname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nickname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_";
  foundHelper = helpers.httpMethod;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.httpMethod; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>\n            <div class='heading'>\n                <h3>\n                  <span class='http_method'>\n                    <a href='#!/";
  foundHelper = helpers.resourceName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.resourceName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.nickname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nickname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_";
  foundHelper = helpers.httpMethod;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.httpMethod; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "' class=\"toggleOperation\">";
  foundHelper = helpers.httpMethod;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.httpMethod; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n                  </span>\n                  <span class='path'>\n                    <a href='#!/";
  foundHelper = helpers.resourceName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.resourceName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.nickname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nickname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_";
  foundHelper = helpers.httpMethod;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.httpMethod; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "' class=\"toggleOperation\">";
  foundHelper = helpers.path;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.path; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n                  </span>\n                </h3>\n                <ul class='options'>\n                    <li>\n                        <a href='#!/";
  foundHelper = helpers.resourceName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.resourceName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "/";
  foundHelper = helpers.nickname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nickname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_";
  foundHelper = helpers.httpMethod;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.httpMethod; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "' class=\"toggleOperation\">";
  foundHelper = helpers.summary;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.summary; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n                    </li>\n                </ul>\n            </div>\n            <div class='content' id='";
  foundHelper = helpers.resourceName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.resourceName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_";
  foundHelper = helpers.nickname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nickname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_";
  foundHelper = helpers.httpMethod;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.httpMethod; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_content' style='display:none'>\n                ";
  stack1 = depth0.notes;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  stack1 = depth0.responseClass;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <form accept-charset='UTF-8' class='sandbox'>\n                    <div style='margin:0;padding:0;display:inline'></div>\n                    <h4>Parameters</h4>\n                    <table class='fullwidth'>\n                        <thead>\n                        <tr>\n                            <th>Parameter</th>\n                            <th>Value</th>\n                            <th style=\"width:50%\">Description</th>\n                        </tr>\n                        </thead>\n                        <tbody class=\"operation-params\">\n\n                        </tbody>\n                    </table>\n                    ";
  stack1 = depth0.isReadOnly;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </form>\n                <div class='response' style='display:none'>\n                    <h4>Request URL</h4>\n                    <div class='block request_url'></div>\n                    <h4>Response Body</h4>\n                    <div class='block response_body'></div>\n                    <h4>Response Code</h4>\n                    <div class='block response_code'></div>\n                    <h4>Response Headers</h4>\n                    <div class='block response_headers'></div>\n                </div>\n            </div>\n        </li>\n    </ul>\n";
  return buffer;});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['param'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = depth0.defaultValue;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		\n	";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<textarea class='body-textarea' name='";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.defaultValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.defaultValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</textarea>\n		";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		    <textarea class='body-textarea' name='";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'></textarea>\n		";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = depth0.defaultValue;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;}
function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<input minlength='0' name='";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "' placeholder='' type='text' value='";
  foundHelper = helpers.defaultValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.defaultValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'/>\n		";
  return buffer;}

function program9(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		    <input minlength='0' name='";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "' placeholder='' type='text' value=''/>\n		";
  return buffer;}

  buffer += "<td class='code'>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ": <tag>";
  foundHelper = helpers.dataType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dataType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</tag></td>\n<td>\n	";
  stack1 = depth0.isBody;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>\n<td>";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>";
  return buffer;});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['param_list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n        ";}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = depth0.defaultValue;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;}
function program4(depth0,data) {
  
  
  return "\n            ";}

function program6(depth0,data) {
  
  
  return "\n                <option selected=\"\" value=''></option>\n            ";}

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = depth0.isDefault;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;}
function program9(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n                <option value='";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " (default)</option>\n            ";
  return buffer;}

function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n                <option value='";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n            ";
  return buffer;}

  buffer += "<td class='code'>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ": <tag>";
  foundHelper = helpers.dataType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dataType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</tag></td>\n<td>\n    <select name='";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>\n        ";
  stack1 = depth0.required;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = depth0.allowableValues;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.descriptiveValues;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </select>\n</td>\n<td>";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>";
  return buffer;});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['param_readonly'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <textarea class='body-textarea' readonly='readonly' name='";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.defaultValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.defaultValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</textarea>\n    ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        ";
  foundHelper = helpers.defaultValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.defaultValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n    ";
  return buffer;}

  buffer += "<td class='code'>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ": <tag>";
  foundHelper = helpers.dataType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dataType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</tag></td>\n<td>\n    ";
  stack1 = depth0.isBody;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>\n<td>";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n";
  return buffer;});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['param_readonly_required'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <textarea class='body-textarea'  readonly='readonly' placeholder='(required)' name='";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.defaultValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.defaultValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</textarea>\n    ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        ";
  foundHelper = helpers.defaultValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.defaultValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n    ";
  return buffer;}

  buffer += "<td class='code required'>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ": <tag>";
  foundHelper = helpers.dataType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dataType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</tag></td>\n<td>\n    ";
  stack1 = depth0.isBody;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>\n<td>";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>";
  return buffer;});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['param_required'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = depth0.defaultValue;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		\n	";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<textarea class='body-textarea' placeholder='(required)' name='";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.defaultValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.defaultValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</textarea>\n		";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		    <textarea class='body-textarea' placeholder='(required)' name='";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'></textarea>\n		";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = depth0.defaultValue;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;}
function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		    <input class='required' minlength='1' name='";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "' placeholder='(required)' type='text' value='";
  foundHelper = helpers.defaultValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.defaultValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'/>\n		";
  return buffer;}

function program9(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		    <input class='required' minlength='1' name='";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "' placeholder='(required)' type='text' value=''/>\n		";
  return buffer;}

  buffer += "<td class='code required'>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ": <tag>";
  foundHelper = helpers.dataType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dataType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</tag></td>\n<td>\n	";
  stack1 = depth0.isBody;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>\n<td>\n    <strong>";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</strong>\n</td>";
  return buffer;});
})();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['resource'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class='heading'>\n    <h2>\n        <a href='#!/";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "' onclick=\"Docs.toggleEndpointListForResource('";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "');\">/";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n    </h2>\n    <ul class='options'>\n        <li>\n            <a href='#!/";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "' id='endpointListTogger_";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'\n               onclick=\"Docs.toggleEndpointListForResource('";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "');\">Show/Hide</a>\n        </li>\n        <li>\n            <a href='#' onclick=\"Docs.collapseOperationsForResource('";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'); return false;\">\n                List Operations\n            </a>\n        </li>\n        <li>\n            <a href='#' onclick=\"Docs.expandOperationsForResource('";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'); return false;\">\n                Expand Operations\n            </a>\n        </li>\n        <li>\n            <a href='";
  foundHelper = helpers.url;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "' target=\"_blank\">Raw</a>\n        </li>\n    </ul>\n</div>\n<ul class='endpoints' id='";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_endpoint_list' style='display:none'>\n\n</ul>\n";
  return buffer;});
})();



// Generated by CoffeeScript 1.4.0
(function() {
  var HeaderView, MainView, OperationView, ParameterView, ResourceView, SwaggerUi,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SwaggerUi = (function(_super) {

    __extends(SwaggerUi, _super);

    function SwaggerUi() {
      return SwaggerUi.__super__.constructor.apply(this, arguments);
    }

    SwaggerUi.prototype.dom_id = "swagger_ui";

    SwaggerUi.prototype.options = null;

    SwaggerUi.prototype.api = null;

    SwaggerUi.prototype.headerView = null;

    SwaggerUi.prototype.mainView = null;

    SwaggerUi.prototype.initialize = function(options) {
      var _this = this;
      if (options == null) {
        options = {};
      }
      if (options.dom_id != null) {
        this.dom_id = options.dom_id;
        delete options.dom_id;
      }
      if (!($('#' + this.dom_id) != null)) {
        $('body').append('<div id="' + this.dom_id + '"></div>');
      }
      this.options = options;
      this.options.success = function() {
        return _this.render();
      };
      this.options.progress = function(d) {
        return _this.showMessage(d);
      };
      this.options.failure = function(d) {
        return _this.onLoadFailure(d);
      };
      this.headerView = new HeaderView({
        el: $('#header')
      });
      return this.headerView.on('update-swagger-ui', function(data) {
        return _this.updateSwaggerUi(data);
      });
    };

    SwaggerUi.prototype.updateSwaggerUi = function(data) {
      this.options.discoveryUrl = data.discoveryUrl;
      this.options.apiKey = data.apiKey;
      return this.load();
    };

    SwaggerUi.prototype.load = function() {
      var _ref;
      if ((_ref = this.mainView) != null) {
        _ref.clear();
      }
      this.headerView.update(this.options.discoveryUrl, this.options.apiKey);
      return this.api = new SwaggerApi(this.options);
    };

    SwaggerUi.prototype.render = function() {
      var _this = this;
      this.showMessage('Finished Loading Resource Information. Rendering Swagger UI...');
      this.mainView = new MainView({
        model: this.api,
        el: $('#' + this.dom_id)
      }).render();
      this.showMessage();
      switch (this.options.docExpansion) {
        case "full":
          Docs.expandOperationsForResource('');
          break;
        case "list":
          Docs.collapseOperationsForResource('');
      }
      if (this.options.onComplete) {
        this.options.onComplete(this.api, this);
      }
      return setTimeout(function() {
        return Docs.shebang();
      }, 400);
    };

    SwaggerUi.prototype.showMessage = function(data) {
      if (data == null) {
        data = '';
      }
      $('#message-bar').removeClass('message-fail');
      $('#message-bar').addClass('message-success');
      return $('#message-bar').html(data);
    };

    SwaggerUi.prototype.onLoadFailure = function(data) {
      var val;
      if (data == null) {
        data = '';
      }
      $('#message-bar').removeClass('message-success');
      $('#message-bar').addClass('message-fail');
      val = $('#message-bar').html(data);
      if (this.options.onFailure != null) {
        this.options.onFailure(data);
      }
      return val;
    };

    return SwaggerUi;

  })(Backbone.Router);

  window.SwaggerUi = SwaggerUi;

  HeaderView = (function(_super) {

    __extends(HeaderView, _super);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.events = {
      'click #show-pet-store-icon': 'showPetStore',
      'click #show-wordnik-dev-icon': 'showWordnikDev',
      'click #explore': 'showCustom',
      'keyup #input_baseUrl': 'showCustomOnKeyup',
      'keyup #input_apiKey': 'showCustomOnKeyup'
    };

    HeaderView.prototype.initialize = function() {};

    HeaderView.prototype.showPetStore = function(e) {
      return this.trigger('update-swagger-ui', {
        discoveryUrl: "http://petstore.swagger.wordnik.com/api/resources.json",
        apiKey: "special-key"
      });
    };

    HeaderView.prototype.showWordnikDev = function(e) {
      return this.trigger('update-swagger-ui', {
        discoveryUrl: "http://api.wordnik.com/v4/resources.json",
        apiKey: ""
      });
    };

    HeaderView.prototype.showCustomOnKeyup = function(e) {
      if (e.keyCode === 13) {
        return this.showCustom();
      }
    };

    HeaderView.prototype.showCustom = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      return this.trigger('update-swagger-ui', {
        discoveryUrl: $('#input_baseUrl').val(),
        apiKey: $('#input_apiKey').val()
      });
    };

    HeaderView.prototype.update = function(url, apiKey, trigger) {
      if (trigger == null) {
        trigger = false;
      }
      $('#input_baseUrl').val(url);
      $('#input_apiKey').val(apiKey);
      if (trigger) {
        return this.trigger('update-swagger-ui', {
          discoveryUrl: url,
          apiKey: apiKey
        });
      }
    };

    return HeaderView;

  })(Backbone.View);

  MainView = (function(_super) {

    __extends(MainView, _super);

    function MainView() {
      return MainView.__super__.constructor.apply(this, arguments);
    }

    MainView.prototype.initialize = function() {};

    MainView.prototype.render = function() {
      var resource, _i, _len, _ref;
      $(this.el).html(Handlebars.templates.main(this.model));
      _ref = this.model.resourcesArray;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        resource = _ref[_i];
        this.addResource(resource);
      }
      return this;
    };

    MainView.prototype.addResource = function(resource) {
      var resourceView;
      resourceView = new ResourceView({
        model: resource,
        tagName: 'li',
        id: 'resource_' + resource.name,
        className: 'resource'
      });
      return $('#resources').append(resourceView.render().el);
    };

    MainView.prototype.clear = function() {
      return $(this.el).html('');
    };

    return MainView;

  })(Backbone.View);

  ResourceView = (function(_super) {

    __extends(ResourceView, _super);

    function ResourceView() {
      return ResourceView.__super__.constructor.apply(this, arguments);
    }

    ResourceView.prototype.initialize = function() {};

    ResourceView.prototype.render = function() {
      var operation, _i, _len, _ref;
      $(this.el).html(Handlebars.templates.resource(this.model));
      _ref = this.model.operationsArray;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        operation = _ref[_i];
        this.addOperation(operation);
      }
      return this;
    };

    ResourceView.prototype.addOperation = function(operation) {
      var operationView;
      operationView = new OperationView({
        model: operation,
        tagName: 'li',
        className: 'endpoint'
      });
      return $('.endpoints', $(this.el)).append(operationView.render().el);
    };

    return ResourceView;

  })(Backbone.View);

  OperationView = (function(_super) {

    __extends(OperationView, _super);

    function OperationView() {
      return OperationView.__super__.constructor.apply(this, arguments);
    }

    OperationView.prototype.events = {
      'submit .sandbox': 'submitOperation',
      'click .submit': 'submitOperation',
      'click .response_hider': 'hideResponse',
      'click .toggleOperation': 'toggleOperationContent'
    };

    OperationView.prototype.initialize = function() {};

    OperationView.prototype.render = function() {
      var isMethodSubmissionSupported, param, _i, _len, _ref;
      isMethodSubmissionSupported = jQuery.inArray(this.model.httpMethod, this.model.supportedSubmitMethods()) >= 0;
      if (!isMethodSubmissionSupported) {
        this.model.isReadOnly = true;
      }
      $(this.el).html(Handlebars.templates.operation(this.model));
      _ref = this.model.parameters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        param = _ref[_i];
        this.addParameter(param);
      }
      return this;
    };

    OperationView.prototype.addParameter = function(param) {
      var paramView;
      paramView = new ParameterView({
        model: param,
        tagName: 'tr',
        readOnly: this.model.isReadOnly
      });
      return $('.operation-params', $(this.el)).append(paramView.render().el);
    };

    OperationView.prototype.submitOperation = function(e) {
      var bodyParam, error_free, form, headerParams, invocationUrl, map, o, obj, param, _i, _j, _len, _len1, _ref, _ref1,
        _this = this;
      if (e != null) {
        e.preventDefault();
      }
      form = $('.sandbox', $(this.el));
      error_free = true;
      form.find("input.required").each(function() {
        var _this = this;
        $(this).removeClass("error");
        if (jQuery.trim($(this).val()) === "") {
          $(this).addClass("error");
          $(this).wiggle({
            callback: function() {
              return $(_this).focus();
            }
          });
          return error_free = false;
        }
      });
      if (error_free) {
        map = {};
        _ref = form.serializeArray();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          o = _ref[_i];
          if ((o.value != null) && jQuery.trim(o.value).length > 0) {
            map[o.name] = o.value;
          }
        }
        bodyParam = null;
        _ref1 = this.model.parameters;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          param = _ref1[_j];
          if (param.paramType === 'body') {
            bodyParam = map[param.name];
          }
        }
        log("bodyParam = " + bodyParam);
        headerParams = null;
        invocationUrl = this.model.supportHeaderParams() ? (headerParams = this.model.getHeaderParams(map), this.model.urlify(map, false)) : this.model.urlify(map, true);
        log('submitting ' + invocationUrl);
        $(".request_url", $(this.el)).html("<pre>" + invocationUrl + "</pre>");
        $(".response_throbber", $(this.el)).show();
        obj = {
          type: this.model.httpMethod,
          url: invocationUrl,
          headers: headerParams,
          data: bodyParam,
          dataType: 'json',
          error: function(xhr, textStatus, error) {
            return _this.showErrorStatus(xhr, textStatus, error);
          },
          success: function(data) {
            return _this.showResponse(data);
          },
          complete: function(data) {
            return _this.showCompleteStatus(data);
          }
        };
        if (obj.type.toLowerCase() === "post" || obj.type.toLowerCase() === "put" || obj.type.toLowerCase() === "patch") {
          obj.contentType = "application/json";
        }
        jQuery.ajax(obj);
        return false;
      }
    };

    OperationView.prototype.hideResponse = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      $(".response", $(this.el)).slideUp();
      return $(".response_hider", $(this.el)).fadeOut();
    };

    OperationView.prototype.showResponse = function(response) {
      var prettyJson;
      prettyJson = JSON.stringify(response, null, "\t").replace(/\n/g, "<br>");
      return $(".response_body", $(this.el)).html(prettyJson);
    };

    OperationView.prototype.showErrorStatus = function(data) {
      return this.showStatus(data);
    };

    OperationView.prototype.showCompleteStatus = function(data) {
      return this.showStatus(data);
    };

    OperationView.prototype.showStatus = function(data) {
      var response_body;
      try {
        if (data.responseText.length > 0) {
          response_body = "<pre>" + JSON.stringify(JSON.parse(data.responseText), null, 2).replace(/\n/g, "<br>") + "</pre>";
        } else {
          response_body = "<pre style='color:dimgrey'>[No Content]</pre>";
        }
      } catch (error) {
        response_body = "<span style='color:red'>&nbsp;&nbsp;&nbsp;[unable to parse as json; raw response below]</span><br><pre>" + data.responseText + "</pre>";
      }
      $(".response_code", $(this.el)).html("<pre>" + data.status + ' ' + data.statusText + "</pre>");
      $(".response_body", $(this.el)).html(response_body);
      $(".response_headers", $(this.el)).html("<pre>" + data.getAllResponseHeaders() + "</pre>");
      $(".response", $(this.el)).slideDown();
      $(".response_hider", $(this.el)).show();
      return $(".response_throbber", $(this.el)).hide();
    };

    OperationView.prototype.toggleOperationContent = function() {
      var elem;
      elem = $('#' + this.model.resourceName + "_" + this.model.nickname + "_" + this.model.httpMethod + "_content");
      if (elem.is(':visible')) {
        return Docs.collapseOperation(elem);
      } else {
        return Docs.expandOperation(elem);
      }
    };

    return OperationView;

  })(Backbone.View);

  ParameterView = (function(_super) {

    __extends(ParameterView, _super);

    function ParameterView() {
      return ParameterView.__super__.constructor.apply(this, arguments);
    }

    ParameterView.prototype.initialize = function() {};

    ParameterView.prototype.render = function() {
      var template;
      if (this.model.paramType === 'body') {
        this.model.isBody = true;
      }
      template = this.template();
      $(this.el).html(template(this.model));
      return this;
    };

    ParameterView.prototype.template = function() {
      if (this.model.isList) {
        return Handlebars.templates.param_list;
      } else {
        if (this.options.readOnly) {
          if (this.model.required) {
            return Handlebars.templates.param_readonly_required;
          } else {
            return Handlebars.templates.param_readonly;
          }
        } else {
          if (this.model.required) {
            return Handlebars.templates.param_required;
          } else {
            return Handlebars.templates.param;
          }
        }
      }
    };

    return ParameterView;

  })(Backbone.View);

}).call(this);

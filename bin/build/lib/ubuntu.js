#!/usr/bin/env node

/*
 *
 * Copyright 2013 Canonical Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
var assert = require('assert');

module.exports.build = function(root_dir, www_dir) {
    var ubuntu_dir = path.join(root_dir, 'platforms', 'ubuntu');
    var campo_dir = path.join(ubuntu_dir, 'build');
    assert.ok(fs.existsSync(ubuntu_dir));
    assert.ok(fs.existsSync(campo_dir));

    shell.pushd(campo_dir);

    shell.exec('cmake . -DCMAKE_INSTALL_PREFIX=".."');
    shell.exec('make -j 6; make install');

    shell.popd();
}

module.exports.run = function(root_dir, www_dir) {
    var ubuntu_dir = path.join(root_dir, 'platforms', 'ubuntu');

    shell.pushd(ubuntu_dir);
    shell.exec('./cordova-ubuntu www/');

    shell.popd();
}

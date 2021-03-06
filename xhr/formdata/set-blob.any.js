// META: title=formData.set(blob) and formData.set(file)

"use strict";

const formData = new FormData();

test(() => {
  formData.set("blob-1", new Blob());
  const blob1 = formData.get("blob-1");
  assert_equals(blob1.constructor.name, "File");
  assert_equals(blob1.name, "blob");
  assert_equals(blob1.type, "");
  assert_less_than(Math.abs(blob1.lastModified - Date.now()), 200, "lastModified should be now");
}, "blob without type");

test(() => {
  formData.set("blob-2", new Blob([], { type: "text/plain" }));
  const blob2 = formData.get("blob-2");
  assert_equals(blob2.constructor.name, "File");
  assert_equals(blob2.name, "blob");
  assert_equals(blob2.type, "text/plain");
  assert_less_than(Math.abs(blob2.lastModified - Date.now()), 200, "lastModified should be now");
}, "blob with type");

test(() => {
  formData.set("blob-3", new Blob(), "custom name");
  const blob3 = formData.get("blob-3");
  assert_equals(blob3.constructor.name, "File");
  assert_equals(blob3.name, "custom name");
  assert_equals(blob3.type, "");
  assert_less_than(Math.abs(blob3.lastModified - Date.now()), 200, "lastModified should be now");
}, "blob with custom name");

test(() => {
  formData.set("file-1", new File([], "name"));
  const file1 = formData.get("file-1");
  assert_equals(file1.constructor.name, "File");
  assert_equals(file1.name, "name");
  assert_equals(file1.type, "");
  assert_less_than(Math.abs(file1.lastModified - Date.now()), 200, "lastModified should be now");
}, "file without lastModified or custom name");

test(() => {
  formData.set("file-2", new File([], "name", { lastModified: 123 }), "custom name");
  const file2 = formData.get("file-2");
  assert_equals(file2.constructor.name, "File");
  assert_equals(file2.name, "custom name");
  assert_equals(file2.type, "");
  assert_equals(file2.lastModified, 123, "lastModified should be 123");
}, "file with lastModified and custom name");
